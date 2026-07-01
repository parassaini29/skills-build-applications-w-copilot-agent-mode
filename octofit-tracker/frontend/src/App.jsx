import { Routes, Route, Link } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function Home() {
  return (
    <div className="container py-5">
      <h1 className="display-4">OctoFit Tracker</h1>
      <p className="lead">A modern multi-tier fitness tracking app with React, Express, and MongoDB.</p>
      <div className="row">
        <div className="col-md-6">
          <div className="list-group">
            <Link className="list-group-item list-group-item-action" to="/users">Users</Link>
            <Link className="list-group-item list-group-item-action" to="/teams">Teams</Link>
            <Link className="list-group-item list-group-item-action" to="/activities">Activities</Link>
            <Link className="list-group-item list-group-item-action" to="/workouts">Workouts</Link>
            <Link className="list-group-item list-group-item-action" to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">OctoFit</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}
