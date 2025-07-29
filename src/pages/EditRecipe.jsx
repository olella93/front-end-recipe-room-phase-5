import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, updateRecipe } from '../features/recipes/recipesSlice';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentRecipe, loading, error } = useSelector((state) => state.recipes);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    country: '',
    serving_size: '',
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentRecipe && user) {
      // Debug: log user and recipe owner
      console.log('EditRecipe check:', {
        recipeUserId: currentRecipe.user_id,
        userId: user.id
      });
      if (currentRecipe.user_id && user.id && String(currentRecipe.user_id) !== String(user.id)) {
        alert('You can only edit your own recipes!');
        navigate('/');
      } else if (currentRecipe.user_id && user.id) {
        setFormData({
          title: currentRecipe.title || '',
          description: currentRecipe.description || '',
          ingredients: Array.isArray(currentRecipe.ingredients) 
            ? currentRecipe.ingredients.join('\n') 
            : currentRecipe.ingredients?.replace(/[\"{},]/g, '').split(' ').join('\n') || '',
          instructions: currentRecipe.instructions || '',
          country: currentRecipe.country || '',
          serving_size: currentRecipe.serving_size || '',
        });
      }
    }
  }, [currentRecipe, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to edit recipes!');
      return;
    }
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }
      await dispatch(updateRecipe({ id, recipeData: data })).unwrap();
      alert('Recipe updated successfully!');
      navigate(`/recipe/${id}`);
    } catch (error) {
      alert('Failed to update recipe.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-600">Error: {error}</div>;
  }

  if (!currentRecipe) {
    return <div className="container mx-auto px-4 py-8">Recipe not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients (one per line) *
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              required
              rows="8"
              placeholder="1 cup flour&#10;2 eggs&#10;1 tsp vanilla"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
              Instructions *
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              required
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country/Cuisine
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="serving_size" className="block text-sm font-medium text-gray-700 mb-2">
                Serving Size
              </label>
              <input
                type="number"
                id="serving_size"
                name="serving_size"
                value={formData.serving_size}
                onChange={handleInputChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
            />
            {currentRecipe.image_url && (
              <div className="mb-3">
                <img 
                  src={currentRecipe.image_url} 
                  alt="Current recipe" 
                  className="w-32 h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Recipe'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/recipe/${id}`)}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
