import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRecipes, searchRecipes, clearSearchResults } from '../features/recipes/recipesSlice';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const dispatch = useDispatch();
  const { items: recipes, searchResults, loading, searchLoading, error } = useSelector((state) => state.recipes);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
   
    // dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      dispatch(searchRecipes(searchTerm));
    } else {
      setIsSearching(false);
      dispatch(clearSearchResults());
    }
  };

  const handleShare = (recipe) => {
    // Handle recipe sharing
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href + `/${recipe._id}`,
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href + `/${recipe._id}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  const displayRecipes = isSearching ? searchResults : recipes;
  const isLoading = isSearching ? searchLoading : loading;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading recipes: {error.message || error}</p>
          <button 
            onClick={() => dispatch(fetchAllRecipes())} 
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Recipe Collection</h1>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-orange-600 text-lg">
            {isSearching ? 'Searching recipes...' : 'Loading recipes...'}
          </div>
        </div>
      )}

      {/* Results Info */}
      {isSearching && !searchLoading && (
        <div className="text-center mb-4">
          <p className="text-gray-600">
            {searchResults.length} recipe(s) found
          </p>
          <button 
            onClick={() => {
              setIsSearching(false);
              dispatch(clearSearchResults());
            }}
            className="text-orange-600 hover:text-orange-800 underline ml-2"
          >
            Show all recipes
          </button>
        </div>
      )}

      {/* Recipe Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecipes.length > 0 ? (
            displayRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe._id || recipe.id} 
                recipe={recipe} 
                onShare={handleShare}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {isSearching ? 'No recipes found for your search.' : 'No recipes available yet.'}
              </p>
              {!isSearching && (
                <p className="text-gray-400 mt-2">
                  Be the first to share a recipe!
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipes;
