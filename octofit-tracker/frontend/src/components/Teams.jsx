import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return data.items || data.data || data.results || [data];
  return [];
}

function getHelpText() {
  return 'VITE_CODESPACE_NAME must be defined in .env.local for Codespaces API support.';
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBaseUrl}/teams/`)
      .then((res) => res.json())
      .then((data) => setTeams(normalizeResponse(data)))
      .catch(() => setError('Failed to load teams.'));
  }, []);

  return (
    <div className="container py-5">
      <h2>Teams</h2>
      <p className="text-muted">{getHelpText()}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.name}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <p className="card-text"><strong>Members:</strong> {Array.isArray(team.members) ? team.members.join(', ') : team.members}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
