import { Router } from 'express';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit backend is running' });
});

router.get('/users', async (_req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.get('/teams', async (_req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

router.post('/teams', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json(team);
});

router.get('/activities', async (_req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

router.post('/activities', async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.status(201).json(activity);
});

router.get('/workouts', async (_req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/workouts', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json(workout);
});

router.get('/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 });
  res.json(leaderboard);
});

router.get('/seed-status', async (_req, res) => {
  const [users, teams, activities, leaderboard, workouts] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Leaderboard.countDocuments(),
    Workout.countDocuments()
  ]);

  res.json({ users, teams, activities, leaderboard, workouts });
});

export default router;
