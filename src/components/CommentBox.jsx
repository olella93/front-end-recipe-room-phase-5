import React, { useState } from 'react';

export default function CommentBox({ onSubmit }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        rows={3}
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <button type="submit" style={{ marginTop: '0.5rem' }}>Post Comment</button>
    </form>
  );
}
