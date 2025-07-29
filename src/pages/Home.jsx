import React from 'react';
import recipe1 from '../assets/images/a1034bea2b87f98a8e7f102470a5bfd0.jpg';
import recipe2 from '../assets/images/download (2).jpeg';
import recipe3 from '../assets/images/download (1).jpeg';
import recipe4 from '../assets/images/peach-macarons-8568.webp';
import '../styles/global.css';

const featuredRecipes = [
  {
    image: recipe1,
    title: 'Spaghetti Bolognese',
    description: 'A simple meaty pasta dish perfect for dinner.',
  },
  {
    image: recipe2,
    title: 'Avocado Toast',
    description: 'A creamy and crunchy breakfast favorite.',
  },
  {
    image: recipe3,
    title: 'Grilled Chicken',
    description: 'Juicy grilled chicken with a smoky kick.',
  },
  {
    image: recipe4,
    title: 'Fresh Fruit Salad',
    description: 'Colorful mix of juicy fruits to refresh your day.',
  },
];

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className="hero-container">
        <h1>Find and share simple recipes</h1>
        <p>Discover easy-to-make recipes and contribute your own contributions</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for recipes..." />
        </div>
      </div>

      <div className="featured-section">
        <h2>Featured Recipes</h2>
        <div className="recipe-grid">
          {featuredRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
