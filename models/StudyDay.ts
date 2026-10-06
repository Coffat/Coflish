import { Schema, model, models, type InferSchemaType } from 'mongoose';

export const StudyDaySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: String, required: true }, // Format 'YYYY-MM-DD'
    minutesStudied: { type: Number, default: 0 },
    cardsReviewed: { type: Number, default: 0 },
    cardsLearned: { type: Number, default: 0 },
    quizzesCompleted: { type: Number, default: 0 },
    writingsGraded: { type: Number, default: 0 },
    speakingSessions: { type: Number, default: 0 },
    streakCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Unique compound index per user per date
StudyDaySchema.index({ userId: 1, date: 1 }, { unique: true });

export type IStudyDay = InferSchemaType<typeof StudyDaySchema>;
export const StudyDayModel = models.StudyDay || model<IStudyDay>('StudyDay', StudyDaySchema);
