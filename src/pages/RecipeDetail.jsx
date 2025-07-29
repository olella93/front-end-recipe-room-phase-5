import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../services/api";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    API.get(`/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!recipe) return <div className="flex justify-center items-center h-64 text-orange-600 text-xl">Loading...</div>;

  // Check if current user owns this recipe
  const isOwner = user && recipe.user_id === user.id;

  // Parse ingredients if they're in string format from backend
  const parseIngredients = (ingredients) => {
    if (Array.isArray(ingredients)) return ingredients;
    if (typeof ingredients === 'string') {
      return ingredients.replace(/[{}",]/g, '').split(' ').filter(item => item.trim());
    }
    return [];
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8 mb-12 recipe-detail-container" id="recipe-detail-container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 recipe-detail-header" id="recipe-detail-header">
        <h1 className="text-3xl font-bold text-orange-600 mb-4 md:mb-0">{recipe.title}</h1>
        {isOwner && (
          <button
            type="button"
            onClick={() => navigate(`/edit/${recipe.id}`)}
            className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700 transition"
          >
            Edit Recipe
          </button>
        )}
      </div>
      <img
        src={recipe.image_url || "https://placehold.co/800x400"}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6 border recipe-detail-img" id="recipe-detail-img"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 recipe-detail-meta" id="recipe-detail-meta">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-gray-700 mb-2">{recipe.description || "N/A"}</p>
          <p className="text-gray-500 text-sm">Country: <span className="font-medium text-gray-700">{recipe.country || "N/A"}</span></p>
          <p className="text-gray-500 text-sm">Serves: <span className="font-medium text-gray-700">{recipe.serving_size || "N/A"}</span></p>
        </div>
        <div className="ingredients-section" id="ingredients-section">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingredients</h3>
          <ul>
            {parseIngredients(recipe.ingredients)?.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="instructions-section" id="instructions-section">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Instructions</h3>
        {Array.isArray(recipe.instructions)
          ? (
            <ol>
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          )
          : (
            <ol>
              {recipe.instructions
                .split(/\n|\r|\.|\d+\./)
                .map(s => s.trim())
                .filter(Boolean)
                .map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
            </ol>
          )
        }
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Rating</h3>
        <p className="text-orange-500 font-bold text-lg">{recipe.rating || "No ratings yet"}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Comments</h3>
        {recipe.comments?.length > 0 ? (
          <div className="space-y-2">
            {recipe.comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 rounded p-2">
                <span className="font-semibold text-gray-700">{comment.username || "User"}:</span> {comment.text || comment.comment}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 transition"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
