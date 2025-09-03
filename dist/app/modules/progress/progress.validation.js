"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressValidation = void 0;
const zod_1 = require("zod");
const markLectureComplete = zod_1.z.object({
    body: zod_1.z.object({
        courseId: zod_1.z.string({
            required_error: 'Course ID is required',
        }).min(24, 'Invalid course ID').max(24, 'Invalid course ID'),
        moduleId: zod_1.z.string({
            required_error: 'Module ID is required',
        }).min(24, 'Invalid module ID').max(24, 'Invalid module ID'),
        lectureId: zod_1.z.string({
            required_error: 'Lecture ID is required',
        }).min(24, 'Invalid lecture ID').max(24, 'Invalid lecture ID'),
        watchTime: zod_1.z.number().min(0, 'Watch time cannot be negative').optional(),
    }),
});
exports.progressValidation = {
    markLectureComplete,
};
