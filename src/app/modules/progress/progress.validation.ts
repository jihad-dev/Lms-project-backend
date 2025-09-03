import { z } from 'zod';

const markLectureComplete = z.object({
  body: z.object({
    courseId: z.string({
      required_error: 'Course ID is required',
    }).min(24, 'Invalid course ID').max(24, 'Invalid course ID'),
    
    moduleId: z.string({
      required_error: 'Module ID is required',
    }).min(24, 'Invalid module ID').max(24, 'Invalid module ID'),
    
    lectureId: z.string({
      required_error: 'Lecture ID is required',
    }).min(24, 'Invalid lecture ID').max(24, 'Invalid lecture ID'),
    
    watchTime: z.number().min(0, 'Watch time cannot be negative').optional(),
  }),
});

export const progressValidation = {
  markLectureComplete,
};
