import { Schema, model, models, type InferSchemaType } from 'mongoose';

export const DeckSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['academic', 'topic', 'ocr', 'custom'],
      default: 'custom',
      index: true,
    },
    cardCount: { type: Number, default: 0 },
    tags: [{ type: String, trim: true }],
    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true }
);

DeckSchema.index({ userId: 1, name: 1 });

export type IDeck = InferSchemaType<typeof DeckSchema>;
export const DeckModel = models.Deck || model<IDeck>('Deck', DeckSchema);
