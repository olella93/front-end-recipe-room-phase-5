import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark } from '../features/bookmarks/bookmarksSlice';
import './RecipeCard.css';

export default function RecipeCard({ recipe }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const bookmarks = useSelector((state) => state.bookmarks.list);

  if (!recipe) {
    return null;
  }


  // Find if this recipe is already bookmarked
  const isBookmarked = bookmarks && bookmarks.some(
    (b) => b.recipe_id === recipe.id || b.recipe_id === recipe._id || b.id === recipe.id || b.id === recipe._id
  );

  const handleBookmark = () => {
    if (recipe.id && !isBookmarked) {
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
          isBookmarked ? (
            <button className="bookmark-btn bookmarked" disabled>
              ★ Bookmarked
            </button>
          ) : (
            <button onClick={handleBookmark} className="bookmark-btn">
              ★ Bookmark
            </button>
          )
        )}
      </div>
    </div>
  );
}
