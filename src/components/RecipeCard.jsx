import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaBookmark, FaRegBookmark, FaShareAlt } from 'react-icons/fa';
import { addBookmark, removeBookmark } from '../features/bookmarks/bookmarkSlice';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onShare }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.items);
  const navigate = useNavigate();

  const isBookmarked = bookmarks.some((item) => item._id === recipe._id);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(recipe._id));
    } else {
      dispatch(addBookmark(recipe));
    }
  };

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on a button inside the card
    if (e.target.closest('button')) return;
    navigate(`/recipes/${recipe.id || recipe._id}`);
  };

  // Always use backend image_url for images
  const imageSrc = recipe.image_url || "https://placehold.co/800x400";

  return (
    <div
      className="recipe-card bg-white shadow-md rounded-lg overflow-hidden p-4 transition duration-200 hover:shadow-lg cursor-pointer card" id={`recipe-card-${recipe.id || recipe._id}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={e => { if (e.key === 'Enter') handleCardClick(e); }}
    >
      <img
        src={imageSrc}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-md mb-4 card-img" id={`card-img-${recipe.id || recipe._id}`}
      />

      <div className="card-content" id={`card-content-${recipe.id || recipe._id}`}> 
        <h3 className="text-xl font-bold mb-2 card-title" id={`card-title-${recipe.id || recipe._id}`}>{recipe.title}</h3>
        <p className="text-gray-700 text-sm mb-2 card-description" id={`card-description-${recipe.id || recipe._id}`}>{recipe.description}</p>

        <div className="flex items-center mb-4 card-rating" id={`card-rating-${recipe.id || recipe._id}`}> 
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className="mr-1"
              color={index < recipe.rating ? '#f47e3b' : '#ccc'}
            />
          ))}
        </div>

        <div className="flex justify-between card-actions" id={`card-actions-${recipe.id || recipe._id}`}> 
          <button onClick={handleBookmarkToggle} className="flex items-center gap-1 text-orange-600 hover:text-orange-800">
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

          <button onClick={e => { e.stopPropagation(); onShare(recipe); }} className="flex items-center gap-1 text-black hover:text-orange-600">
            <FaShareAlt />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
