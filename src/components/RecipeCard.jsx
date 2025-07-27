import React from 'react';
import { FaStar, FaBookmark, FaShareAlt } from 'react-icons/fa';

const RecipeCard = ({ recipe, onBookmark, onShare }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="card-img" />

      <div className="card-content">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-description">{recipe.description}</p>

        <div className="card-rating">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              color={index < recipe.rating ? '#f47e3b' : '#ccc'}
            />
          ))}
        </div>

        <div className="card-actions">
          <button onClick={() => onBookmark(recipe)} className="action-btn">
            <FaBookmark /> Bookmark
          </button>
          <button onClick={() => onShare(recipe)} className="action-btn">
            <FaShareAlt /> Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
