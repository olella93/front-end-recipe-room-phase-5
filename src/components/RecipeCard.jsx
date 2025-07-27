import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaBookmark, FaRegBookmark, FaShareAlt } from 'react-icons/fa';
import { addBookmark, removeBookmark } from '../features/bookmarks/bookmarkSlice';

const RecipeCard = ({ recipe, onShare }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.items);

  const isBookmarked = bookmarks.some((item) => item._id === recipe._id);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(recipe._id));
    } else {
      dispatch(addBookmark(recipe));
    }
  };

  return (
    <div className="recipe-card bg-white shadow-md rounded-lg overflow-hidden p-4 transition duration-200 hover:shadow-lg">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <div className="card-content">
        <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
        <p className="text-gray-700 text-sm mb-2">{recipe.description}</p>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className="mr-1"
              color={index < recipe.rating ? '#f47e3b' : '#ccc'}
            />
          ))}
        </div>

        <div className="flex justify-between">
          <button onClick={handleBookmarkToggle} className="flex items-center gap-1 text-orange-600 hover:text-orange-800">
            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

          <button onClick={() => onShare(recipe)} className="flex items-center gap-1 text-black hover:text-orange-600">
            <FaShareAlt />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
