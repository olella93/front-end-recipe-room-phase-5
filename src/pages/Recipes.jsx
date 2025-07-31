import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, searchRecipes } from '../features/recipes/recipesSlice';
import SearchBar from '../components/SearchBar';
import { FaSearch, FaUtensils } from 'react-icons/fa';
import RecipeCard from '../components/RecipeCard';
import { Link } from 'react-router-dom';

const Recipes = () => {
  const dispatch = useDispatch();
  const { list: recipes, loading, error } = useSelector((state) => state.recipes);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const bookmarks = useSelector((state) => state.bookmarks.items);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const RECIPES_PER_PAGE = 3;
  const debounceRef = useRef();

  useEffect(() => {
   
    // dispatch(fetchAllRecipes());
  }, [dispatch]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim().length > 0) {
      dispatch(searchRecipes(searchTerm));
    } else {
      dispatch(fetchRecipes());
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

  const displayRecipes = recipes;
  const isLoading = loading;
  const totalPages = Math.ceil(displayRecipes.length / RECIPES_PER_PAGE);
  const paginatedRecipes = displayRecipes.slice((currentPage - 1) * RECIPES_PER_PAGE, currentPage * RECIPES_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Debounced live search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (searchText.trim().length > 0) {
        dispatch(searchRecipes(searchText));
      } else {
        dispatch(fetchRecipes());
      }
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [searchText, dispatch]);


  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error loading recipes: {typeof error === 'string' ? error : error.message || 'Failed to load recipes'}</p>
          <button 
            onClick={() => dispatch(fetchRecipes())} 
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'linear-gradient(135deg, #fff7f0 0%, #ffe5d0 100%)', minHeight: '100vh', paddingBottom: '2rem' }}>
      {/* Hero Section */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1rem 2rem 1rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <FaUtensils size={48} color="#ff9966" style={{ marginBottom: 8 }} />
          <h1 style={{ fontSize: '2.7rem', fontWeight: 800, color: '#ff5e62', letterSpacing: '-1px', marginBottom: 8 }}>Discover & Share Recipes</h1>
          <p style={{ color: '#7a5c3e', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto' }}>
            Explore a world of delicious recipes, search by name or ingredient, and get inspired to cook something new. Share your own creations and join our food-loving community!
          </p>
        </div>
      </div>

      {/* Add Recipe Button */}
      {isAuthenticated && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', maxWidth: 900, margin: '0 auto', marginBottom: 24 }}>
          <Link to="/create">
            <button style={{ background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)', color: '#fff', padding: '0.8rem 2rem', borderRadius: 12, fontWeight: 700, fontSize: '1.1rem', border: 'none', boxShadow: '0 2px 8px rgba(255,153,102,0.08)', cursor: 'pointer', transition: 'background 0.2s' }}>
              + Add Recipe
            </button>
          </Link>
        </div>
      )}

      {/* Modern Search Bar */}
      <div style={{ maxWidth: 500, margin: '0 auto', marginBottom: 40 }}>
        <form onSubmit={e => { e.preventDefault(); handleSearch(searchText); }} style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 32, boxShadow: '0 2px 12px rgba(255,153,102,0.08)', padding: '0.5rem 1rem' }}>
          <FaSearch size={20} color="#ff9966" style={{ marginRight: 12 }} />
          <input
            type="text"
            placeholder="Search recipes by name or ingredient..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1.1rem', background: 'transparent', color: '#333', padding: '0.7rem 0' }}
          />
          <button type="submit" style={{ background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)', color: '#fff', border: 'none', borderRadius: 32, padding: '0.6rem 1.5rem', fontWeight: 700, fontSize: '1rem', marginLeft: 10, cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,153,102,0.08)' }}>Search</button>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: '#ff9966', fontSize: '1.3rem', fontWeight: 600 }}>
          Loading recipes...
        </div>
      )}

      {/* Recipe Grid with Pagination */}
      {!isLoading && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: 1100,
            margin: '0 auto',
            marginBottom: 32
          }}>
            {paginatedRecipes.length > 0 ? (
              paginatedRecipes.map((recipe) => (
                <div key={recipe._id || recipe.id} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px rgba(255,153,102,0.10)', padding: 0, overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
                  <RecipeCard recipe={recipe} onShare={handleShare} />
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0' }}>
                <p style={{ color: '#bfa07a', fontSize: '1.3rem', fontWeight: 500 }}>
                  No recipes found. Try searching for something else or add your own!
                </p>
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
                  padding: '0.5rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid #ffb88c',
                  background: currentPage === 1 ? '#ffe5d0' : '#ffb88c',
                  color: currentPage === 1 ? '#aaa' : '#fff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
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
                    padding: '0.5rem 1.2rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    background: currentPage === i + 1 ? 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)' : '#fff',
                    color: currentPage === i + 1 ? '#fff' : '#333',
                    fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                    fontSize: '1.1rem',
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
                  padding: '0.5rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid #ffb88c',
                  background: currentPage === totalPages ? '#ffe5d0' : '#ffb88c',
                  color: currentPage === totalPages ? '#aaa' : '#fff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
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
