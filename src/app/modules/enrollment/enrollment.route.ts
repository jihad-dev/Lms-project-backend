import express from 'express';
import { EnrollmentControllers } from './enrollment.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { enrollmentValidation } from './enrollment.validation';

const router = express.Router();

// User routes
router.post(
  '/',
  validateRequest(enrollmentValidation.createEnrollmentRequest),
  auth(['student', 'admin']),
  EnrollmentControllers.createEnrollmentRequest
);

router.get(
  '/my-requests',
  validateRequest(enrollmentValidation.getEnrollmentRequests),
  auth(['student', 'admin']),
  EnrollmentControllers.getEnrollmentRequestsByUser
);

router.get(
  '/status/:courseId',
  auth(['student', 'admin']),
  EnrollmentControllers.checkUserEnrollmentStatus
);

router.get(
  '/:id',
  auth(['student', 'admin']),
  EnrollmentControllers.getEnrollmentRequestById
);

router.delete(
  '/:id',
  auth(['student', 'admin']),
  EnrollmentControllers.deleteEnrollmentRequest
);

// Admin routes
router.get(
  '/',
  validateRequest(enrollmentValidation.getEnrollmentRequests),
  auth(['admin']),
  EnrollmentControllers.getAllEnrollmentRequests
);

router.patch(
  '/:id',
  validateRequest(enrollmentValidation.updateEnrollmentRequest),
  auth(['admin']),
  EnrollmentControllers.updateEnrollmentRequest
);

export const EnrollmentRoutes = router;