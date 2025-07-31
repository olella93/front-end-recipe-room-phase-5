import React, { useState, useEffect } from 'react';

export default function RatingStars({ currentRating = 0, onRate }) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(currentRating);

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: 'pointer',
            color: star <= (hover || rating) ? 'gold' : 'gray',
            fontSize: '1.5rem'
          }}
          onClick={() => {
            setRating(star);
            if (onRate) onRate(star);
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
