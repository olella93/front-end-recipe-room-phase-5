import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRecipes, searchRecipes, clearSearchResults } from '../features/recipes/recipesSlice';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const dispatch = useDispatch();
  const { items: recipes, searchResults, loading, searchLoading, error } = useSelector((state) => state.recipes);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const bookmarks = useSelector((state) => state.bookmarks.items);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const RECIPES_PER_PAGE = 4;

  useEffect(() => {
   
    // dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim().length > 0) {
      setIsSearching(true);
      dispatch(searchRecipes(searchTerm));
    } else {
      setIsSearching(false);
      dispatch(clearSearchResults());
    }
  };

  const handleShare = async (recipe) => {
    // Handle recipe sharing
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description,
          url: window.location.href + `/${recipe._id}`,
        });
      } catch (error) {
        // User canceled the share or sharing failed
        if (error.name !== 'AbortError') {
          // Only show error if it's not a user cancellation
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href + `/${recipe._id}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  const displayRecipes = isSearching ? searchResults : recipes;
  const isLoading = isSearching ? searchLoading : loading;
  const totalPages = Math.ceil(displayRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = displayRecipes.slice((currentPage - 1) * RECIPES_PER_PAGE, currentPage * RECIPES_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when search or recipes change
  useEffect(() => {
    setCurrentPage(1);
  }, [isSearching, searchResults, recipes]);

  // Debug logs
  console.log('Search Results:', searchResults);
  console.log('All Recipes:', recipes);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading recipes: {typeof error === 'string' ? error : error.message || 'Failed to load recipes'}</p>
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
      {/* Add Recipe Button */}
      {isAuthenticated && (
        <div className="flex justify-end max-w-4xl mx-auto mb-6">
          <Link to="/create">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow hover:bg-orange-600 transition">
              + Add Recipe
            </button>
          </Link>
        </div>
      )}
      
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

      {/* Recipe Grid with Pagination */}
      {!isLoading && (
        <>
          <div className="recipe-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" id="recipe-grid">
            {paginatedRecipes.length > 0 ? (
              paginatedRecipes.map((recipe) => (
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
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0', gap: '0.5rem' }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #ffb88c',
                  background: currentPage === 1 ? '#ffe5d0' : '#ffb88c',
                  color: currentPage === 1 ? '#aaa' : '#fff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  transition: 'background 0.2s'
                }}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    background: currentPage === i + 1 ? 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)' : '#fff',
                    color: currentPage === i + 1 ? '#fff' : '#333',
                    fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                    cursor: 'pointer',
                    margin: '0 2px'
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #ffb88c',
                  background: currentPage === totalPages ? '#ffe5d0' : '#ffb88c',
                  color: currentPage === totalPages ? '#aaa' : '#fff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  transition: 'background 0.2s'
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Recipes;
