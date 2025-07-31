import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark } from '../features/bookmarks/bookmarksSlice';
import './RecipeCard.css';

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!recipe) {
    return null;
  }

  const handleBookmark = () => {
    if (recipe.id) {
      dispatch(addBookmark(recipe.id));
    }
  };

  const imageUrl = recipe.image_url || '/default-recipe-image.jpg';
  const title = recipe.title || 'Untitled';
  const description = recipe.description ? recipe.description.slice(0, 80) + '...' : '';

  return (
    <div className="recipe-card">
      <img src={imageUrl} alt={title} />
      <div className="recipe-info">
        <h3>{title}</h3>
        <p>{description}</p>
        {recipe.id && (
          <Link to={`/recipes/${recipe.id}`} className="view-btn">
            View Recipe
          </Link>
        )}
        {user && recipe.id && (
          <button onClick={handleBookmark} className="bookmark-btn">
            ★ Bookmark
          </button>
        )}
      </div>
    </div>
  );
}
