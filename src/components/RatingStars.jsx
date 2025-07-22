import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function Rating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl"
        >
          <FaStar 
            className={star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"} 
          />
        </button>
      ))}
      <p className="ml-2">Rating: {rating} stars</p>
    </div>
  );
}

export default Rating;