import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
async function seed() {
  await mongoose.connect('mongodb://127.0.0.1:27017/octofit_db');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.insertMany([
    {
      username: 'maria',
      email: 'maria@example.com',
      password: 'password123',
      role: 'admin'
    },
    {
      username: 'liam',
      email: 'liam@example.com',
      password: 'password123',
      role: 'member'
    },
    {
      username: 'sophia',
      email: 'sophia@example.com',
      password: 'password123',
      role: 'member'
    }
  ]);

  await Team.insertMany([
    {
      name: 'Storm Riders',
      description: 'A high-energy training team',
      members: users.slice(0, 2).map((user) => user.username)
    },
    {
      name: 'Peak Performers',
      description: 'Focused on endurance and strength',
      members: [users[2].username]
    }
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      duration: 35,
      calories: 420
    },
    {
      userId: users[1]._id.toString(),
      type: 'strength',
      duration: 50,
      calories: 510
    },
    {
      userId: users[2]._id.toString(),
      type: 'cycling',
      duration: 45,
      calories: 390
    }
  ]);

  await Leaderboard.insertMany([
    { userId: users[0]._id.toString(), username: 'maria', score: 980, rank: 1 },
    { userId: users[1]._id.toString(), username: 'liam', score: 915, rank: 2 },
    { userId: users[2]._id.toString(), username: 'sophia', score: 900, rank: 3 }
  ]);

  await Workout.insertMany([
    {
      name: 'HIIT Circuit',
      category: 'cardio',
      difficulty: 'intermediate',
      duration: 25
    },
    {
      name: 'Core Stability Flow',
      category: 'mobility',
      difficulty: 'beginner',
      duration: 20
    },
    {
      name: 'Power Lift',
      category: 'strength',
      difficulty: 'advanced',
      duration: 40
    }
  ]);

  console.log('Seed the octofit_db database with test data');
  console.log('Database seeded successfully');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
