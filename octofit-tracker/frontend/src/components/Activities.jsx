import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeResponse, getHelpText } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/activities`)
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
