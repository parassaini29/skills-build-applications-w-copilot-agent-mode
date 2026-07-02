import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: string;
  difficulty: string;
  duration: number;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true }
}, { timestamps: true });

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
