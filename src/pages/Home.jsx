
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllRecipes } from '../features/recipes/recipesSlice';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard'

const Home = () => {
  const dispatch = useDispatch();
  const { items: recipes, loading } = useSelector((state) => state.recipes);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    // Navigate to recipes page with search
    window.location.href = `/recipes?search=${encodeURIComponent(searchTerm)}`;
  };

  const handleShare = async (recipe) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: `${window.location.origin}/recipes/${recipe._id}`,
        });
      } catch (error) {
        // User canceled the share or sharing failed
        if (error.name !== 'AbortError') {
          // Only show error if it's not a user cancellation
          console.error('Error sharing:', error);
        }
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/recipes/${recipe._id}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  // Show only first 6 recipes on home page
  const featuredRecipes = recipes.slice(0, 6);

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
    <div className="min-h-screen home-page" id="home-page">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-16 hero-section" id="hero-section">
        <div className="container mx-auto px-4 text-center hero-content" id="hero-content">
          <h1 className="text-5xl font-bold mb-4">Welcome to Recipe Room</h1>
          <p className="text-xl mb-8">Discover and share amazing recipes from around the world!</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Featured Recipes Section */}
      <div className="container mx-auto px-4 py-12 featured-section" id="featured-section">
        <div className="flex justify-between items-center mb-8 featured-header" id="featured-header">
          <h2 className="text-3xl font-bold text-gray-800">Featured Recipes</h2>
          <Link 
            to="/recipes" 
            className="text-orange-600 hover:text-orange-800 font-semibold"
          >
            View All Recipes →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="text-orange-600 text-lg">Loading recipes...</div>
          </div>
        ) : featuredRecipes.length > 0 ? (
          <div className="grid grid-cols-3 gap-8 featured-grid" id="featured-grid">
            {featuredRecipes.map((recipe, idx) => (
              <RecipeCard 
                key={recipe._id || recipe.id || idx} 
                recipe={recipe} 
                onShare={handleShare}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No recipes available yet.</p>
            {isAuthenticated && (
              <Link 
                to="/create" 
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-200"
              >
                Create Your First Recipe
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      {!isAuthenticated && (
        <div className="bg-gray-50 py-16 cta-section" id="cta-section">
          <div className="container mx-auto px-4 text-center cta-content" id="cta-content">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600 mb-8">
              Sign up to share your recipes, save favorites, and connect with fellow food lovers.
            </p>
            <div className="space-x-4">
              <Link 
                to="/signup" 
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-200"
              >
                Get Started
              </Link>
              <Link 
                to="/login" 
                className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg hover:bg-orange-50 transition duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
