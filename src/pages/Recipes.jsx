import React from 'react';
import RecipeCard from '../components/RecipeCard';

const dummyRecipes = [
  {
    id: 1,
    title: 'Spicy Ugali Delight',
    description: 'A Kenyan twist with some heat!',
    image: '/assets/images/ugali.jpg'
  },
  {
    id: 2,
    title: 'Matoke Mash',
    description: 'Banana bliss in every bite.',
    image: '/assets/images/matoke.jpg'
  },
];

const Recipes = () => {
  return (
    <div className="recipes-page">
      <h2 className="recipes-title">All Recipes</h2>
      <div className="recipe-grid">
        {dummyRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
