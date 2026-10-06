import { Schema, model, models, type InferSchemaType } from 'mongoose';

export const CardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    deckId: { type: Schema.Types.ObjectId, ref: 'Deck', required: true, index: true },
    word: { type: String, required: true, trim: true },
    pos: { type: String, trim: true, default: '' },
    ipa: { type: String, default: '' },
    meaning_vi: { type: String, required: true, trim: true },
    example: { type: String, default: '' },
    example_vi: { type: String, default: '' },
    collocations: [{ type: String, trim: true }],
    level: {
      type: String,
      enum: ['A2', 'B1', 'B2', 'C1'],
      default: 'B1',
    },
    tags: [{ type: String, trim: true }],

    // Spaced Repetition (SM-2 Algorithm)
    easeFactor: { type: Number, default: 2.5, min: 1.3, required: true },
    interval: { type: Number, default: 0, required: true },
    repetitions: { type: Number, default: 0, required: true },
    nextReview: { type: Date, required: true, default: () => new Date(), index: true },
    lastReviewed: { type: Date },
  },
  { timestamps: true }
);

CardSchema.index({ userId: 1, nextReview: 1 });
CardSchema.index({ deckId: 1, nextReview: 1 });
CardSchema.index({ userId: 1, word: 1 });

export type ICard = InferSchemaType<typeof CardSchema>;
export const CardModel = models.Card || model<ICard>('Card', CardSchema);
