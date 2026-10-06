import { Schema, model, models, type InferSchemaType } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    avatarUrl: { type: String },
    currentLevel: {
      type: String,
      enum: ['A2', 'B1', 'B2', 'C1'],
      default: 'B1',
      required: true,
    },
    targetBand: { type: Number, default: 7.0, min: 4.0, max: 9.0, required: true },
    targetExamDate: { type: Date },
    role: { type: String, enum: ['user', 'admin'], default: 'user', required: true },
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof UserSchema>;
export const UserModel = models.User || model<IUser>('User', UserSchema);
