import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeResponse, getHelpText } from '../api';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/leaderboard`)
      .then((res) => res.json())
      .then((data) => setLeaders(normalizeResponse(data)))
      .catch(() => setError('Failed to load leaderboard.'));
  }, []);

  return (
    <div className="container py-5">
      <h2>Leaderboard</h2>
      <p className="text-muted">{getHelpText()}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((player) => (
            <tr key={player._id || player.userId}>
              <td>{player.rank}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
