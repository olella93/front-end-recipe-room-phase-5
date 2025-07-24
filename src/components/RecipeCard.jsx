import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipes/${recipe.id}`} className="recipe-card-link">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="recipe-content">
          <h3 className="recipe-title">{recipe.title}</h3>
          <p className="recipe-summary">Serves: {recipe.serves} | Time: {recipe.time}</p>
          <p className="recipe-rating">{recipe.rating || "No ratings"}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
