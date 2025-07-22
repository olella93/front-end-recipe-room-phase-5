import { useState } from 'react';

function Filter() {
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const cuisines = ['all', 'Italian', 'Mexican', 'Chinese', 'Indian'];

  return (
    <div className="mb-4 p-4 bg-gray-100 rounded">
      <h3 className="font-bold mb-2">Filter by Cuisine:</h3>
      <select
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}
        className="p-2 border rounded w-full"
      >
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
      <p className="mt-2">Selected: {selectedCuisine}</p>
    </div>
  );
}

export default Filter;