import React from "react";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.bookmarks.items); // matches with bookmarkSlice.js
  
  const handleShare = (recipe) => {
    navigator.clipboard.writeText(`${window.location.origin}/recipes/${recipe._id}`);
    alert('Link copied to clipboard');
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-[#fdbb89]">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Your Bookmarked Recipes</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You haven't bookmarked any recipes yet!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )
      };
    </div>
  );
};

export default Bookmarks;
