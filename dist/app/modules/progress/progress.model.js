"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressSummary = exports.Progress = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const progressSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Course ID is required'],
    },
    moduleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Module',
        required: [true, 'Module ID is required'],
    },
    lectureId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
// Compound unique index to prevent duplicate progress entries
progressSchema.index({ userId: 1, courseId: 1, moduleId: 1, lectureId: 1 }, { unique: true });
// Indexes for efficient queries
progressSchema.index({ userId: 1, courseId: 1 });
progressSchema.index({ userId: 1, moduleId: 1 });
const Progress = mongoose_1.default.model('Progress', progressSchema);
exports.Progress = Progress;
// Progress Summary Schema
const progressSummarySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
// Compound unique index for progress summary
progressSummarySchema.index({ userId: 1, courseId: 1 }, { unique: true });
// Indexes for efficient queries
progressSummarySchema.index({ userId: 1 });
progressSummarySchema.index({ courseId: 1 });
const ProgressSummary = mongoose_1.default.model('ProgressSummary', progressSummarySchema);
exports.ProgressSummary = ProgressSummary;
