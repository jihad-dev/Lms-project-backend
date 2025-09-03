"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const course_model_1 = __importDefault(require("./course.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCourse = async (payload) => {
    const result = await course_model_1.default.create(payload);
    return result;
};
const getAllCourses = async (filters) => {
    const courseQuery = new QueryBuilder_1.default(course_model_1.default.find(), filters)
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
const getCourseById = async (id) => {
    const result = await course_model_1.default.findById(id)
        .populate('modulesCount')
        .populate('totalDuration');
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    return result;
};
const updateCourse = async (id, payload) => {
    const result = await course_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    return result;
};
const deleteCourse = async (id) => {
    const result = await course_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Course not found');
    }
    return result;
};
const getPublishedCourses = async (filters) => {
    const publishedFilters = { ...filters, isPublished: true };
    const courseQuery = new QueryBuilder_1.default(course_model_1.default.find(), publishedFilters)
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
exports.CourseServices = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    getPublishedCourses,
};
