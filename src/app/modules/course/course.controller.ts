import { Request, Response, NextFunction } from 'express';
import { CourseServices } from './course.services';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ICourseFilters } from './course.interface';
import catchAsync from '../../utils/catchAsync';

const createCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await CourseServices.createCourse(req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const filters: ICourseFilters = req.query;
  const result = await CourseServices.getAllCourses(filters);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    data: result.data,
  });
});

const getCourseById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await CourseServices.getCourseById(id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourse(id, req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourse(id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const getPublishedCourses = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const filters: ICourseFilters = req.query;
  const result = await CourseServices.getPublishedCourses(filters);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Published courses retrieved successfully',
    data: result.data,  
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getPublishedCourses,
};
