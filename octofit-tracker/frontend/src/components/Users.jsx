import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeResponse, getHelpText } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(normalizeResponse(data)))
      .catch(() => setError('Failed to load users.'));
  }, []);

  return (
    <div className="container py-5">
      <h2>Users</h2>
      <p className="text-muted">{getHelpText()}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user._id || user.username}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text"><strong>Role:</strong> {user.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
