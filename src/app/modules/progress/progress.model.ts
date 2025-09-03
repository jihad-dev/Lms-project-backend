import mongoose, { Schema } from 'mongoose';
import { IProgress, IProgressSummary } from './progress.interface';

const progressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course ID is required'],
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: [true, 'Module ID is required'],
    },
    lectureId: {
      type: Schema.Types.ObjectId,
      ref: 'Lecture',
      required: [true, 'Lecture ID is required'],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    watchTime: {
      type: Number,
      min: [0, 'Watch time cannot be negative'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index to prevent duplicate progress entries
progressSchema.index(
  { userId: 1, courseId: 1, moduleId: 1, lectureId: 1 },
  { unique: true }
);

// Indexes for efficient queries
progressSchema.index({ userId: 1, courseId: 1 });
progressSchema.index({ userId: 1, moduleId: 1 });

const Progress = mongoose.model<IProgress>('Progress', progressSchema);

// Progress Summary Schema
const progressSummarySchema = new Schema<IProgressSummary>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course ID is required'],
    },
    totalLectures: {
      type: Number,
      required: [true, 'Total lectures count is required'],
      min: [0, 'Total lectures cannot be negative'],
    },
    completedLectures: {
      type: Number,
      required: [true, 'Completed lectures count is required'],
      min: [0, 'Completed lectures cannot be negative'],
    },
    progressPercentage: {
      type: Number,
      required: [true, 'Progress percentage is required'],
      min: [0, 'Progress percentage cannot be negative'],
      max: [100, 'Progress percentage cannot exceed 100'],
    },
    lastAccessedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index for progress summary
progressSummarySchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);

// Indexes for efficient queries
progressSummarySchema.index({ userId: 1 });
progressSummarySchema.index({ courseId: 1 });

const ProgressSummary = mongoose.model<IProgressSummary>('ProgressSummary', progressSummarySchema);

export { Progress, ProgressSummary };
