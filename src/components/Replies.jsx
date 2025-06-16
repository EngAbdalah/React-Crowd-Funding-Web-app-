import { useEffect, useState } from 'react';
import { fetchReplies } from '../api/engagementApi';

export default function Replies() {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReplies()
      .then(data => setReplies(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading replies...</p>;

  return (
    <div>
      <h2>Replies</h2>
      {replies.map(reply => (
        <div key={reply.id} style={{ border: '1px dashed #aaa', padding: '10px', margin: '10px 0' }}>
          <p><strong>User:</strong> {reply.user?.username}</p>
          <p><strong>Comment:</strong> {reply.comment?.text}</p>
          <p>{reply.text}</p>
          <small>{new Date(reply.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
