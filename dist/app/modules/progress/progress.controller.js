"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressControllers = void 0;
const progress_services_1 = require("./progress.services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const markLectureComplete = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.user?.id;
    const result = await progress_services_1.ProgressServices.markLectureComplete({
        ...req.body,
        userId,
    });
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lecture marked as completed',
        data: result,
    });
});
const getLectureProgress = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    const { lectureId } = req.params;
    const result = await progress_services_1.ProgressServices.getLectureProgress(userId, lectureId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lecture progress retrieved successfully',
        data: result,
    });
});
const getCourseProgress = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    const { courseId } = req.params;
    const result = await progress_services_1.ProgressServices.getCourseProgress(userId, courseId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Course progress retrieved successfully',
        data: result,
    });
});
const getUserAllProgress = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    const result = await progress_services_1.ProgressServices.getUserAllProgress(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User progress retrieved successfully',
        data: result,
    });
});
const getNextLecture = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    const { courseId, lectureId } = req.params;
    const result = await progress_services_1.ProgressServices.getNextLecture(userId, courseId, lectureId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Next lecture retrieved successfully',
        data: result,
    });
});
const isLectureUnlocked = (0, catchAsync_1.default)(async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }
    const { courseId, lectureId } = req.params;
    const result = await progress_services_1.ProgressServices.isLectureUnlocked(userId, courseId, lectureId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Lecture unlock status retrieved successfully',
        data: { isUnlocked: result },
    });
});
exports.ProgressControllers = {
    markLectureComplete,
    getLectureProgress,
    getCourseProgress,
    getUserAllProgress,
    getNextLecture,
    isLectureUnlocked,
};
