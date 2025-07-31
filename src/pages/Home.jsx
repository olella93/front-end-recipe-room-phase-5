import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, searchRecipes } from '../features/recipes/recipesSlice';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.recipes);

  const [filters, setFilters] = useState({
    search: '',
    country: '',
    min_rating: '',
    serving_size: ''
  });
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef(null);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        loaderRef.current &&
        loaderRef.current.getBoundingClientRect().top < window.innerHeight
      ) {
        setVisibleCount((prev) => Math.min(prev + 8, list.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [list.length]);

  // Debounce timer for live search
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCount(12);
      if (filters.search.trim()) {
        dispatch(searchRecipes(filters.search.trim()));
      } else {
        dispatch(fetchRecipes({
          country: filters.country,
          min_rating: filters.min_rating,
          serving_size: filters.serving_size
        }));
      }
    }, 400); // 400ms debounce
    return () => clearTimeout(timer);
  // Only run when search input changes
  }, [filters.search, dispatch]);

  // Handle filter changes (country, min_rating, serving_size)
  const handleSearch = (e) => {
    e.preventDefault();
    setVisibleCount(12);
    dispatch(fetchRecipes({
      country: filters.country,
      min_rating: filters.min_rating,
      serving_size: filters.serving_size
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Latest Recipes</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        <input
          type="text"
          name="search"
          placeholder="Search recipes..."
          value={filters.search}
          onChange={handleFilterChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={filters.country}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="min_rating"
          placeholder="Min Rating"
          value={filters.min_rating}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="serving_size"
          placeholder="Serving Size"
          value={filters.serving_size}
          onChange={handleFilterChange}
        />
        <button type="submit">Apply</button>
      </form>

      {loading && <p>Loading recipes...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        {list.slice(0, visibleCount).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {visibleCount < list.length && (
        <div ref={loaderRef} style={{ textAlign: 'center', padding: '1rem', color: '#555' }}>
          Loading more recipes...
        </div>
      )}
    </div>
  );
}
