import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import API from "../services/api.js"; 

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    API.get("/recipes")
      .then((res) => setRecipes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="recipes-page">
      <h1>All Recipes</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
