import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    API.get(`/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <div className="loading-message">Loading...</div>;

  return (
    <div className="recipe-detail-container">
      <h1 className="recipe-title">{recipe.title}</h1>
      <p className="serves-count">Serves: {recipe.serves}</p>

      <h3 className="section-heading">Ingredients</h3>
      <ul className="ingredients-list">
        {recipe.ingredients?.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <h3 className="section-heading">Instructions</h3>
      <ol className="instructions-list">
        {recipe.steps?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div className="rating-section">
        <h3 className="section-heading">Rating</h3>
        <p className="rating-value"> {recipe.rating || "No ratings yet"}</p>
      </div>

      <div className="comments-section">
        <h3 className="section-heading">Comments</h3>
        {recipe.comments?.length ? (
          recipe.comments.map((comment, index) => (
            <div key={index} className="comment-box">
              <p className="comment-text">{comment.text}</p>
              <p className="comment-user">By {comment.user}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet</p>
        )}
      </div>

      <div className="share-section">
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="share-button"
        >
          Copy Link
        </button>
      </div>
import React from 'react';

const RecipeDetail = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Recipe Details</h1>
      <p className="text-gray-600">Recipe detail page coming soon...</p>
    </div>
  );
};

export default RecipeDetail;
