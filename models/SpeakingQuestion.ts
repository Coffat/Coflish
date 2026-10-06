import { Schema, model, models, type InferSchemaType } from 'mongoose';

export const SpeakingQuestionSchema = new Schema(
  {
    part: { type: Number, enum: [1, 2, 3], required: true, index: true },
    topic: { type: String, required: true, index: true },
    question: { type: String, required: true },
    cueCardBullets: [{ type: String }],
    suggestedIdeas: [{ type: String }],
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

SpeakingQuestionSchema.index({ part: 1, topic: 1 });

export type ISpeakingQuestion = InferSchemaType<typeof SpeakingQuestionSchema>;
export const SpeakingQuestionModel =
  models.SpeakingQuestion || model<ISpeakingQuestion>('SpeakingQuestion', SpeakingQuestionSchema);
