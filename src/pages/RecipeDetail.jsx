import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../features/recipes/recipesSlice';
import { deleteRecipe } from '../features/recipes/recipesSlice';
import { useNavigate } from 'react-router-dom';
import authHeader from '../utils/authHeader';
import { submitRating, clearRatingState } from '../features/ratings/ratingSlice';
import { fetchComments, createComment, updateComment, deleteComment } from '../features/comments/commentsSlice';
import RatingStars from '../components/RatingStars';
import CommentBox from '../components/CommentBox';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedRecipe, loading } = useSelector((state) => state.recipes);
  const { list: comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);
  const { submitting, error: ratingError, success: ratingSuccess } = useSelector((state) => state.ratings);

  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [ratingMessage, setRatingMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

useEffect(() => {
  if (selectedRecipe && typeof selectedRecipe.user_rating !== 'undefined') {
    setUserRating(selectedRecipe.user_rating);
  }
}, [selectedRecipe]);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (ratingSuccess) {
      setRatingMessage(ratingSuccess);
      dispatch(clearRatingState());
    }
    if (ratingError) {
      setRatingMessage(ratingError);
      dispatch(clearRatingState());
    }
  }, [ratingSuccess, ratingError, dispatch]);

  const handleRating = (value) => {
    if (!user) {
      setRatingMessage('You must be logged in to rate this recipe');
      return;
    }
    if (value === userRating) {
      return; 
    }
    dispatch(submitRating({ recipeId: id, value }))
      .unwrap()
      .then(() => setUserRating(value))
      .catch(err => {
        if (typeof err === 'string' && err.includes('already rated')) {
          setRatingMessage('You have already rated this recipe');
          setUserRating(value); 
        } else {
          setRatingMessage(err?.toString() || 'An error occurred');
        }
      });
  };

  const handleCommentSubmit = (text) => {
    if (!user) {
      alert('You must be logged in to comment');
      return;
    }
    dispatch(createComment({ recipeId: id, text }));
  };

  const handleEdit = (commentId, text) => {
    setEditCommentId(commentId);
    setEditText(text);
  };

  const handleUpdate = () => {
    dispatch(updateComment({ commentId: editCommentId, text: editText }));
    setEditCommentId(null);
    setEditText('');
  };

  const handleDelete = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      dispatch(deleteComment(commentId));
    }
  };

  const handleDeleteRecipe = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteRecipe = () => {
    dispatch(deleteRecipe(id))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setRatingMessage(err?.toString() || 'Failed to delete recipe');
      });
    setShowDeleteConfirm(false);
  };

  const cancelDeleteRecipe = () => {
    setShowDeleteConfirm(false);
  };

  if (loading || !selectedRecipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{selectedRecipe.title}</h1>
      <p>
        Average rating:{' '}
        {selectedRecipe.average_rating !== null && selectedRecipe.average_rating !== undefined
          ? `${selectedRecipe.average_rating} / 5`
          : 'No ratings yet'}
      </p>
      {selectedRecipe.image_url && (
        <img src={selectedRecipe.image_url} alt={selectedRecipe.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      )}
      {user && selectedRecipe.user_id === user.id && (
        <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
          <button style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', background: '#ff914d', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => window.location.href = `/recipes/${selectedRecipe.id}/edit`}>
            Edit Recipe
          </button>
          <button style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', background: '#d32f2f', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleDeleteRecipe}>
            Delete Recipe
          </button>
        </div>
      )}

      {showDeleteConfirm && (
        <div style={{
          background: '#fff3f3',
          color: '#d32f2f',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          textAlign: 'center',
          maxWidth: '400px',
          margin: '0 auto 1rem auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Are you sure you want to delete this recipe?
          </div>
          <div style={{ marginBottom: '1rem' }}>
            This action cannot be undone.
          </div>
          <button
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '8px',
              background: '#d32f2f',
              color: '#fff',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
            onClick={confirmDeleteRecipe}
          >Delete</button>
          <button
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '8px',
              background: '#ccc',
              color: '#333',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={cancelDeleteRecipe}
          >Cancel</button>
        </div>
      )}
      {ratingMessage && (
        <div style={{
          background: '#fff3f3',
          color: '#d32f2f',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          marginBottom: '1rem',
          textAlign: 'center',
          position: 'relative',
          maxWidth: '400px',
          margin: '0 auto 1rem auto'
        }}>
          {ratingMessage}
          <button
            style={{
              position: 'absolute',
              right: '10px',
              top: '8px',
              background: 'none',
              border: 'none',
              color: '#d32f2f',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
            onClick={() => setRatingMessage('')}
            aria-label="Dismiss"
          >×</button>
        </div>
      )}
      <RatingStars currentRating={userRating} onRate={handleRating} />
      <p>{selectedRecipe.description}</p>

      <h3>Ingredients</h3>
      <p>{selectedRecipe.ingredients}</p>

      <h3>Instructions</h3>
      <p>{selectedRecipe.instructions}</p>

      <h3>Comments</h3>
      {comments.map((c) => (
        <div key={c.id} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem 0' }}>
          <strong>{c.user?.username || 'Anonymous'}:</strong>
          {editCommentId === c.id ? (
            <>
              <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
              <button onClick={handleUpdate}>Save</button>
            </>
          ) : (
            <span> {c.text}</span>
          )}
          {user?.id === c.user_id && editCommentId !== c.id && (
            <>
              <button onClick={() => handleEdit(c.id, c.text)}>Edit</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      <CommentBox onSubmit={handleCommentSubmit} />
    </div>
  );
}
