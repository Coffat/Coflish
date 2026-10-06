import { Schema, model, models, type InferSchemaType } from 'mongoose';

export const ErrorItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    sourceType: {
      type: String,
      enum: ['quiz', 'writing', 'speaking', 'manual'],
      required: true,
      index: true,
    },
    sourceId: { type: Schema.Types.ObjectId },
    originalText: { type: String, required: true },
    issue_vi: { type: String, required: true },
    correction: { type: String, required: true },
    criterion: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'resolved', 'archived'],
      default: 'active',
      index: true,
    },
    reviewCount: { type: Number, default: 0 },
    lastReviewedAt: { type: Date },
  },
  { timestamps: true }
);

ErrorItemSchema.index({ userId: 1, status: 1, criterion: 1 });

export type IErrorItem = InferSchemaType<typeof ErrorItemSchema>;
export const ErrorItemModel = models.ErrorItem || model<IErrorItem>('ErrorItem', ErrorItemSchema);
