import { Schema, model, models, type InferSchemaType } from 'mongoose';

const QuizQuestionSnapshotSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'flashcard'], required: true },
    question: { type: String, required: true },
    options: [{ type: String }],
    correctAnswer: { type: Number, required: true },
    userAnswer: { type: Number, default: null },
    isCorrect: { type: Boolean, default: false },
    explanation_vi: { type: String, required: true },
    tag: { type: String, default: '' },
  },
  { _id: false }
);

export const QuizAttemptSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    target: { type: String, enum: ['vocab', 'grammar', 'mixed'], required: true, index: true },
    level: { type: String, enum: ['A2', 'B1', 'B2'], required: true },
    sourceType: {
      type: String,
      enum: ['document', 'error_notebook', 'topic'],
      default: 'document',
    },
    sourceSnippet: { type: String, default: '' },
    questions: [QuizQuestionSnapshotSchema],
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    durationSeconds: { type: Number, default: 0 },
    completedAt: { type: Date, default: () => new Date(), index: true },
  },
  { timestamps: true }
);

QuizAttemptSchema.index({ userId: 1, completedAt: -1 });

export type IQuizAttempt = InferSchemaType<typeof QuizAttemptSchema>;
export const QuizAttemptModel = models.QuizAttempt || model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema);
