"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit backend is running' });
});
router.get('/users', async (_req, res) => {
    const users = await user_1.User.find();
    res.json(users);
});
router.post('/users', async (req, res) => {
    const user = new user_1.User(req.body);
    await user.save();
    res.status(201).json(user);
});
router.get('/teams', async (_req, res) => {
    const teams = await team_1.Team.find();
    res.json(teams);
});
router.post('/teams', async (req, res) => {
    const team = new team_1.Team(req.body);
    await team.save();
    res.status(201).json(team);
});
router.get('/activities', async (_req, res) => {
    const activities = await activity_1.Activity.find();
    res.json(activities);
});
router.post('/activities', async (req, res) => {
    const activity = new activity_1.Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await workout_1.Workout.find();
    res.json(workouts);
});
router.post('/workouts', async (req, res) => {
    const workout = new workout_1.Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
});
router.get('/leaderboard', async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find().sort({ rank: 1 });
    res.json(leaderboard);
});
router.get('/seed-status', async (_req, res) => {
    const [users, teams, activities, leaderboard, workouts] = await Promise.all([
        user_1.User.countDocuments(),
        team_1.Team.countDocuments(),
        activity_1.Activity.countDocuments(),
        leaderboard_1.Leaderboard.countDocuments(),
        workout_1.Workout.countDocuments()
    ]);
    res.json({ users, teams, activities, leaderboard, workouts });
});
exports.default = router;
