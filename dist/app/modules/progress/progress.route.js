"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressRoutes = void 0;
const express_1 = __importDefault(require("express"));
const progress_controller_1 = require("./progress.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const progress_validation_1 = require("./progress.validation");
const router = express_1.default.Router();
// All routes require authentication
router.use((0, auth_1.default)(['user', 'admin']));
router.post('/complete', (0, validateRequest_1.default)(progress_validation_1.progressValidation.markLectureComplete), progress_controller_1.ProgressControllers.markLectureComplete);
router.get('/lecture/:lectureId', progress_controller_1.ProgressControllers.getLectureProgress);
router.get('/course/:courseId', progress_controller_1.ProgressControllers.getCourseProgress);
router.get('/user/all', progress_controller_1.ProgressControllers.getUserAllProgress);
router.get('/next/:courseId/:lectureId', progress_controller_1.ProgressControllers.getNextLecture);
router.get('/unlock/:courseId/:lectureId', progress_controller_1.ProgressControllers.isLectureUnlocked);
exports.ProgressRoutes = router;
