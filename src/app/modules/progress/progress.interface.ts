import mongoose from 'mongoose';

export interface IProgress {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  moduleId: mongoose.Types.ObjectId;
  lectureId: mongoose.Types.ObjectId;
  isCompleted: boolean;
  completedAt?: Date;
  watchTime?: number; // in seconds
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProgressSummary {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  totalLectures: number;
  completedLectures: number;
  progressPercentage: number;
  lastAccessedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
