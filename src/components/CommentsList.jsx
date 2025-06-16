import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentsList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/engagement/comments/')
      .then(res => setComments(res.data))
      .catch(err => console.error('Error fetching comments:', err));
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      {comments.map(comment => (
        <div key={comment.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
          <p><strong>User:</strong> {comment.user.username}</p>
          <p><strong>Project:</strong> {comment.project.title}</p>
          <p>{comment.text}</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>{new Date(comment.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
