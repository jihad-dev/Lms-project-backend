import { IProgress, IProgressSummary } from './progress.interface';
import { Progress, ProgressSummary } from './progress.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const markLectureComplete = async (payload: IProgress) => {
  const result = await Progress.findOneAndUpdate(
    {
      userId: payload.userId,
      courseId: payload.courseId,
      moduleId: payload.moduleId,
      lectureId: payload.lectureId,
    },
    {
      ...payload,
      isCompleted: true,
      completedAt: new Date(),
    },
    {
      new: true,
      upsert: true,
    }
  );

  // Update progress summary
  await updateProgressSummary(payload.userId.toString(), payload.courseId.toString());

  return result;
};

const getLectureProgress = async (userId: string, lectureId: string) => {
  const result = await Progress.findOne({
    userId,
    lectureId,
  });

  return result;
};

const getCourseProgress = async (userId: string, courseId: string) => {
  const result = await ProgressSummary.findOne({
    userId,
    courseId,
  });

  if (!result) {
    // Create initial progress summary if it doesn't exist
    const totalLectures = await getTotalLecturesInCourse(courseId);
    const completedLectures = 0;
    const progressPercentage = 0;

    const newProgressSummary = await ProgressSummary.create({
      userId,
      courseId,
      totalLectures,
      completedLectures,
      progressPercentage,
      lastAccessedAt: new Date(),
    });

    return newProgressSummary;
  }

  return result;
};

const getUserAllProgress = async (userId: string) => {
  const result = await ProgressSummary.find({ userId })
    .populate('courseId')
    .sort({ lastAccessedAt: -1 });

  return result;
};

const updateProgressSummary = async (userId: string, courseId: string) => {
  const totalLectures = await getTotalLecturesInCourse(courseId);
  const completedLectures = await Progress.countDocuments({
    userId,
    courseId,
    isCompleted: true,
  });

  const progressPercentage = Math.round((completedLectures / totalLectures) * 100);

  const result = await ProgressSummary.findOneAndUpdate(
    {
      userId,
      courseId,
    },
    {
      totalLectures,
      completedLectures,
      progressPercentage,
      lastAccessedAt: new Date(),
    },
    {
      new: true,
      upsert: true,
    }
  );

  return result;
};

const getTotalLecturesInCourse = async (courseId: string) => {
  if (!mongoose.connection.db) {
    throw new Error('Database connection not available');
  }
  const result = await mongoose.connection.db
    .collection('lectures')
    .aggregate([
      {
        $lookup: {
          from: 'modules',
          localField: 'moduleId',
          foreignField: '_id',
          as: 'module',
        },
      },
      {
        $match: {
          'module.courseId': new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $count: 'total',
      },
    ])
    .toArray();

  return result[0]?.total || 0;
};

const getNextLecture = async (userId: string, courseId: string, currentLectureId: string) => {
  if (!mongoose.connection.db) {
    throw new Error('Database connection not available');
  }
  // Get current lecture details
  const currentLecture = await mongoose.connection.db
    .collection('lectures')
    .findOne({ _id: new mongoose.Types.ObjectId(currentLectureId) });

  if (!currentLecture) {
    throw new AppError(httpStatus.NOT_FOUND, 'Current lecture not found');
  }

  // Get next lecture in sequence
  const nextLecture = await mongoose.connection.db
    .collection('lectures')
    .aggregate([
      {
        $lookup: {
          from: 'modules',
          localField: 'moduleId',
          foreignField: '_id',
          as: 'module',
        },
      },
      {
        $match: {
          'module.courseId': new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $sort: {
          'module.moduleNumber': 1,
          order: 1,
        },
      },
      {
        $match: {
          $or: [
            {
              'module.moduleNumber': { $gt: currentLecture.moduleId },
            },
            {
              'module.moduleNumber': currentLecture.moduleId,
              order: { $gt: currentLecture.order },
            },
          ],
        },
      },
      {
        $limit: 1,
      },
    ])
    .toArray();

  return nextLecture[0] || null;
};

const isLectureUnlocked = async (userId: string, courseId: string, lectureId: string) => {
  if (!mongoose.connection.db) {
    throw new Error('Database connection not available');
  }
  // Get lecture details
  const lecture = await mongoose.connection.db
    .collection('lectures')
    .aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(lectureId),
        },
      },
      {
        $lookup: {
          from: 'modules',
          localField: 'moduleId',
          foreignField: '_id',
          as: 'module',
        },
      },
      {
        $match: {
          'module.courseId': new mongoose.Types.ObjectId(courseId),
        },
      },
    ])
    .toArray();

  if (!lecture[0]) {
    return false;
  }

  const { moduleNumber, order } = lecture[0];

  // Check if previous lecture is completed
  if (order === 1) {
    // First lecture in module - check if previous module's last lecture is completed
    if (moduleNumber === 1) {
      return true; // First lecture of first module
    }

    const previousModuleLastLecture = await mongoose.connection.db!
      .collection('lectures')
      .aggregate([
        {
          $lookup: {
            from: 'modules',
            localField: 'moduleId',
            foreignField: '_id',
            as: 'module',
          },
        },
        {
          $match: {
            'module.courseId': new mongoose.Types.ObjectId(courseId),
            'module.moduleNumber': moduleNumber - 1,
          },
        },
        {
          $sort: { order: -1 },
        },
        {
          $limit: 1,
        },
      ])
      .toArray();

    if (!previousModuleLastLecture[0]) {
      return false;
    }

    const progress = await Progress.findOne({
      userId,
      courseId,
      lectureId: previousModuleLastLecture[0]._id,
      isCompleted: true,
    });

    return !!progress;
  } else {
    // Check if previous lecture in same module is completed
    const previousLecture = await mongoose.connection.db!
      .collection('lectures')
      .findOne({
        moduleId: lecture[0].moduleId,
        order: order - 1,
      });

    if (!previousLecture) {
      return false;
    }

    const progress = await Progress.findOne({
      userId,
      courseId,
      lectureId: previousLecture._id,
      isCompleted: true,
    });

    return !!progress;
  }
};

export const ProgressServices = {
  markLectureComplete,
  getLectureProgress,
  getCourseProgress,
  getUserAllProgress,
  updateProgressSummary,
  getNextLecture,
  isLectureUnlocked,
};
