import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: string;
  username: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true }
}, { timestamps: true });

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
