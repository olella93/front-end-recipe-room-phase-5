import React from 'react';

export default function Notification({ message, type = 'success', onClose }) {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed',
      top: '2rem',
      right: '2rem',
      zIndex: 1000,
      background: type === 'success' ? 'linear-gradient(90deg,#43e97b 0%,#38f9d7 100%)' : '#ff5f6d',
      color: '#222',
      padding: '1rem 2rem',
      borderRadius: '10px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
      fontWeight: 600,
      fontSize: '1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      minWidth: '220px',
    }}>
      <span>{message}</span>
      <button onClick={onClose} style={{
        background: 'none',
        border: 'none',
        color: '#222',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        cursor: 'pointer',
        marginLeft: '1rem',
      }}>&times;</button>
    </div>
  );
}
