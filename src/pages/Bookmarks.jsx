import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks, deleteBookmark } from '../features/bookmarks/bookmarksSlice';
import RecipeCard from '../components/RecipeCard';

export default function Bookmarks() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.bookmarks);
  const { user } = useSelector((state) => state.auth);


  const [pendingRemove, setPendingRemove] = useState(null); // bookmark id

  useEffect(() => {
    if (user) {
      dispatch(fetchBookmarks());
    }
  }, [dispatch, user]);

  const handleRemove = (id) => {
    setPendingRemove(id);
  };

  const confirmRemove = () => {
    if (pendingRemove) {
      dispatch(deleteBookmark(pendingRemove));
      setPendingRemove(null);
    }
  };

  const cancelRemove = () => {
    setPendingRemove(null);
  };

  if (!user) {
    return <p>You must be logged in to view your bookmarks.</p>;
  }

  return (
    <div>
      <h1>My Bookmarked Recipes</h1>
      {loading && <p>Loading bookmarks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {list.length === 0 && !loading && <p>No bookmarks yet.</p>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        {list.map((bookmark) => (
          <div key={bookmark.id} style={{ position: 'relative' }}>
            <RecipeCard recipe={bookmark.recipe} />
            <button
              onClick={() => handleRemove(bookmark.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'red',
                color: 'white',
                border: 'none',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            {/* In-app confirmation overlay */}
            {pendingRemove === bookmark.id && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(255,255,255,0.96)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                borderRadius: 12,
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
              }}>
                <div style={{ fontWeight: 600, marginBottom: 12, color: '#a04a00' }}>Remove this bookmark?</div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={confirmRemove} style={{ background: '#ff5e62', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Remove</button>
                  <button onClick={cancelRemove} style={{ background: '#eee', color: '#a04a00', border: 'none', borderRadius: 6, padding: '0.4rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
