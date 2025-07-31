import { useState, useRef } from 'react';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  const debounceRef = useRef();

  // Debounced live search
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (onSearch) {
        if (value.trim().length > 0) {
          onSearch(value);
        } else {
          onSearch(''); 
        }
      }
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      if (searchText.trim().length > 0) {
        onSearch(searchText);
      } else {
        onSearch('');
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Search recipes..."
        className="px-4 py-2 border rounded w-full"
        value={searchText}
        onChange={handleInputChange}
      />
      <button 
        type="submit" 
        className="mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;