"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../database");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
// Seed the octofit_db database with test data
async function seed() {
    await (0, database_1.connectDatabase)();
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({})
    ]);
    const users = await user_1.User.insertMany([
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
    await team_1.Team.insertMany([
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
    await activity_1.Activity.insertMany([
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
    await leaderboard_1.Leaderboard.insertMany([
        { userId: users[0]._id.toString(), username: 'maria', score: 980, rank: 1 },
        { userId: users[1]._id.toString(), username: 'liam', score: 915, rank: 2 },
        { userId: users[2]._id.toString(), username: 'sophia', score: 900, rank: 3 }
    ]);
    await workout_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
