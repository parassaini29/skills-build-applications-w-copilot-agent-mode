import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function normalizeResponse(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return data.items || data.data || data.results || [data];
  return [];
}

function getHelpText() {
  return 'VITE_CODESPACE_NAME must be defined in .env.local for Codespaces API support.';
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiHost}/api/workouts/`)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeResponse(data)))
      .catch(() => setError('Failed to load workouts.'));
  }, []);

  return (
    <div className="container py-5">
      <h2>Workouts</h2>
      <p className="text-muted">{getHelpText()}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {workouts.map((workout) => (
          <div className="col-md-4" key={workout._id || workout.name}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text"><strong>Category:</strong> {workout.category}</p>
                <p className="card-text"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="card-text"><strong>Duration:</strong> {workout.duration} mins</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
