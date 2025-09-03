import { ICourse, ICourseFilters } from './course.interface';
import Course from './course.model';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourse = async (payload: ICourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async (filters: ICourseFilters) => {
  const courseQuery = new QueryBuilder(Course.find(), filters as Record<string, unknown>)
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

const getCourseById = async (id: string) => {
  const result = await Course.findById(id)
    .populate('modulesCount')
    .populate('totalDuration');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  return result;
};

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  return result;
};

const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }

  return result;
};

const getPublishedCourses = async (filters: ICourseFilters) => {
  const publishedFilters = { ...filters, isPublished: true };
  const courseQuery = new QueryBuilder(Course.find(), publishedFilters as Record<string, unknown>)
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();

  return {
    meta,
    data: result,
  };
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getPublishedCourses,
};
