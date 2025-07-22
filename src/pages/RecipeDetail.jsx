import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

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

//Recipe image
      <img
        src={recipe.image || "https://via.placeholder.com/800x400"}
        alt={recipe.title}
        className="recipe-image"
      />

//Serves,time and Difficulty
      <div className="recipe-meta">
        <p>Serves: {recipe.serves || "N/A"}</p>
        <p>Time: {recipe.time || "N/A"}</p>
        <p> Difficulty: {recipe.difficulty || "N/A"}</p>
      </div>

//Ingredients
      <h3 className="section-heading">Ingredients</h3>
      <ul className="ingredients-list">
        {recipe.ingredients?.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

//Instructions
      <h3 className="section-heading">Instructions</h3>
      <ol className="instructions-list">
        {recipe.steps?.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

//Ratings
      <div className="rating-section">
        <h3 className="section-heading">Rating</h3>
        <p className="rating-value">{recipe.rating || "No ratings yet"}</p>
      </div>

//Comments
      <div className="comments-section">
        <h3 className="section-heading">Comments</h3>
        {recipe.comments?.length > 0 ? (
          recipe.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.username || "User"}:</strong>{" "}
                {comment.text || comment.comment}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

//Share
      <div className="share-section">
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="share-button"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
