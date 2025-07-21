import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';

function SearchBar({ initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(query)}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
    navigate('/recipes');
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="absolute left-3 top-2.5 text-gray-400">
        <FaSearch />
      </button>
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
      )}
    </form>
  );
}

export default SearchBar;