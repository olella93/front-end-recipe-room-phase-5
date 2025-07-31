import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookmarks, deleteBookmark } from '../features/bookmarks/bookmarksSlice';
import RecipeCard from '../components/RecipeCard';

export default function Bookmarks() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.bookmarks);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchBookmarks());
    }
  }, [dispatch, user]);

  const handleRemove = (id) => {
    if (window.confirm('Remove this bookmark?')) {
      dispatch(deleteBookmark(id));
    }
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
          </div>
        ))}
      </div>
    </div>
  );
}
