import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllRecipes } from '../features/recipes/recipesSlice';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const dispatch = useDispatch();
  const { items: recipes, loading } = useSelector((state) => state.recipes);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    
    // dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    // Navigate to recipes page with search
    window.location.href = `/recipes?search=${encodeURIComponent(searchTerm)}`;
  };

  const handleShare = (recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: `${window.location.origin}/recipes/${recipe._id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/recipes/${recipe._id}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  // Show only first 6 recipes on home page
  const featuredRecipes = recipes.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Recipe Room</h1>
          <p className="text-xl mb-8">Discover and share amazing recipes from around the world!</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Featured Recipes Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe._id || recipe.id} 
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
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
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
