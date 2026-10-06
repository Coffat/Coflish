import { Schema, model, models, type InferSchemaType } from 'mongoose';

const SpeakingIssueSchema = new Schema(
  {
    quote: { type: String, required: true },
    issue_vi: { type: String, required: true },
    correction: { type: String, required: true },
    criterion: { type: String, required: true },
  },
  { _id: false }
);

const SpeakingTurnSchema = new Schema(
  {
    part: { type: Number, enum: [1, 2, 3], required: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'SpeakingQuestion' },
    question: { type: String, required: true },
    transcript: { type: String, required: true },
    transcript_fixed: { type: String },
    audioSeconds: { type: Number, required: true },
    bands: {
      fluency_coherence: { type: Number },
      lexical_resource: { type: Number },
      grammatical_range: { type: Number },
      pronunciation: { type: Number },
    },
    issues: [SpeakingIssueSchema],
    better_answer_vi: { type: String },
    feedback_vi: { type: String },
  },
  { _id: false }
);

export const SpeakingAttemptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mode: { type: String, enum: ['full_mock', 'single'], required: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending',
      index: true,
    },
    jobId: { type: String, index: true },
    errorMessage: { type: String },
    turns: [SpeakingTurnSchema],
    overall: { type: Number, index: true },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

SpeakingAttemptSchema.index({ userId: 1, createdAt: -1 });

export type ISpeakingAttempt = InferSchemaType<typeof SpeakingAttemptSchema>;
export const SpeakingAttemptModel =
  models.SpeakingAttempt || model<ISpeakingAttempt>('SpeakingAttempt', SpeakingAttemptSchema);
