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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${apiBaseUrl}/activities/`)
      .then((res) => res.json())
      .then((data) => setActivities(normalizeResponse(data)))
      .catch(() => setError('Failed to load activities.'));
  }, []);

  return (
    <div className="container py-5">
      <h2>Activities</h2>
      <p className="text-muted">{getHelpText()}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {activities.map((activity) => (
          <div className="col-md-4" key={activity._id || `${activity.userId}-${activity.type}` }>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{activity.type}</h5>
                <p className="card-text"><strong>Duration:</strong> {activity.duration} mins</p>
                <p className="card-text"><strong>Calories:</strong> {activity.calories}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
