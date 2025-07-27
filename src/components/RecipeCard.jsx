import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-description">{recipe.description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
