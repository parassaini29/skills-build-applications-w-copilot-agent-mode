import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return data.items || data.data || data.results || [data];
  return [];
}

function getHelpText() {
  return 'VITE_CODESPACE_NAME must be defined in .env.local for Codespaces API support.';
}

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(apiUrl)
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
