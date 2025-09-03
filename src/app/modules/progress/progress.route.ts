import express from 'express';
import { ProgressControllers } from './progress.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { progressValidation } from './progress.validation';


const router = express.Router();

// All routes require authentication
router.use(auth(['user', 'admin']));

router.post(
  '/complete',
  validateRequest(progressValidation.markLectureComplete),
  ProgressControllers.markLectureComplete
);

router.get('/lecture/:lectureId', ProgressControllers.getLectureProgress);
router.get('/course/:courseId', ProgressControllers.getCourseProgress);
router.get('/user/all', ProgressControllers.getUserAllProgress);
router.get('/next/:courseId/:lectureId', ProgressControllers.getNextLecture);
router.get('/unlock/:courseId/:lectureId', ProgressControllers.isLectureUnlocked);

export const ProgressRoutes = router;
