import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchText);
    } else {
      console.log("Searching for:", searchText);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Search recipes..."
        className="px-4 py-2 border rounded w-full"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
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