import { useEffect, useState } from 'react';
import { fetchRates } from '../api/engagementApi';

export default function Rates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates()
      .then(data => setRates(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading rates...</p>;

  return (
    <div>
      <h2>Project Ratings</h2>
      {rates.map(rate => (
        <div key={rate.id} style={{ border: '1px solid #bbb', padding: '10px', margin: '10px 0' }}>
          <p><strong>User:</strong> {rate.user?.username}</p>
          <p><strong>Project:</strong> {rate.project?.title}</p>
          <p><strong>Rate:</strong> {rate.value} / 5</p>
          <small>{new Date(rate.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
