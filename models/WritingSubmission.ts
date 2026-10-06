import { Schema, model, models, type InferSchemaType } from 'mongoose';

const WritingErrorSchema = new Schema(
  {
    sentence: { type: String, required: true },
    issue_vi: { type: String, required: true },
    correction: { type: String, required: true },
    criterion: { type: String, required: true },
  },
  { _id: false }
);

const WritingRewriteSchema = new Schema(
  {
    original: { type: String, required: true },
    better: { type: String, required: true },
    why_vi: { type: String, required: true },
  },
  { _id: false }
);

export const WritingSubmissionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    taskType: { type: String, enum: ['task1', 'task2'], required: true, index: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    wordCount: { type: Number, required: true },
    targetBand: { type: Number, required: true },

    // Queue & Processing State
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
      index: true,
    },
    jobId: { type: String, index: true },
    errorMessage: { type: String },

    // Grading Result
    bands: {
      task_achievement: { type: Number },
      coherence_cohesion: { type: Number },
      lexical_resource: { type: Number },
      grammatical_range: { type: Number },
    },
    overall: { type: Number, index: true },
    errors: [WritingErrorSchema],
    rewrites: [WritingRewriteSchema],
    feedback_vi: { type: String },
    completedAt: { type: Date },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

WritingSubmissionSchema.index({ userId: 1, createdAt: -1 });

export type IWritingSubmission = InferSchemaType<typeof WritingSubmissionSchema>;
export const WritingSubmissionModel =
  models.WritingSubmission || model<IWritingSubmission>('WritingSubmission', WritingSubmissionSchema);
