import { Request, Response, NextFunction } from 'express';
import { ProgressServices } from './progress.services';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';

const markLectureComplete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  const result = await ProgressServices.markLectureComplete({
    ...req.body,
    userId,
  });
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lecture marked as completed',
    data: result,
  });
});

const getLectureProgress = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const { lectureId } = req.params;
  const result = await ProgressServices.getLectureProgress(userId, lectureId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lecture progress retrieved successfully',
    data: result,
  });
});

const getCourseProgress = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const { courseId } = req.params;
  const result = await ProgressServices.getCourseProgress(userId, courseId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course progress retrieved successfully',
    data: result,
  });
});

const getUserAllProgress = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const result = await ProgressServices.getUserAllProgress(userId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User progress retrieved successfully',
    data: result,
  });
});

const getNextLecture = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const { courseId, lectureId } = req.params;
  const result = await ProgressServices.getNextLecture(userId, courseId, lectureId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Next lecture retrieved successfully',
    data: result,
  });
});

const isLectureUnlocked = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'User not authenticated' });
    return;
  }
  const { courseId, lectureId } = req.params;
  const result = await ProgressServices.isLectureUnlocked(userId, courseId, lectureId);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Lecture unlock status retrieved successfully',
    data: { isUnlocked: result },
  });
});

export const ProgressControllers = {
  markLectureComplete,
  getLectureProgress,
  getCourseProgress,
  getUserAllProgress,
  getNextLecture,
  isLectureUnlocked,
};
