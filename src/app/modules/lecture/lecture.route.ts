import express from 'express';
import { LectureControllers } from './lecture.controller';
import { multerUpload } from '../../config/multer.config';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { lectureValidation } from './lecture.validation';


const router = express.Router();

// Admin routes (require admin/superAdmin role)
router.post(
  '/',
  multerUpload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'pdfNotes', maxCount: 10 }
  ]),
  (req, res, next) => {
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      if (files.videoFile) {
        req.body.videoFile = files.videoFile[0].path;
      }
      
      if (files.pdfNotes) {
        req.body.pdfNotes = files.pdfNotes.map(file => file.path);
      }
    }
    next();
  },
  validateRequest(lectureValidation.createLecture),
  auth(['admin']),
  LectureControllers.createLecture
);

router.put(
  '/:id',
  multerUpload.fields([
    { name: 'videoFile', maxCount: 1 },
    { name: 'pdfNotes', maxCount: 10 }
  ]),
  (req, res, next) => {
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      
      if (files.videoFile) {
        req.body.videoFile = files.videoFile[0].path;
      }
      
      if (files.pdfNotes) {
        req.body.pdfNotes = files.pdfNotes.map(file => file.path);
      }
    }
    next();
  },
  validateRequest(lectureValidation.updateLecture),
  auth(['admin',]),
  LectureControllers.updateLecture
);

router.delete(
  '/:id',
  auth(['admin']),
  LectureControllers.deleteLecture
);

router.put(
  '/reorder/:moduleId',
  validateRequest(lectureValidation.reorderLectures),
  auth(['admin']),
  LectureControllers.reorderLectures
);

// Public routes
router.get('/', LectureControllers.getAllLectures);
router.get('/module/:moduleId', LectureControllers.getLecturesByModule);
router.get('/course/:courseId', LectureControllers.getLecturesByCourse);
router.get('/:id', LectureControllers.getLectureById);

export const LectureRoutes = router;
