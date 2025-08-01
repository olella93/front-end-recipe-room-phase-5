import React, { useState, useEffect } from 'react';
import Notification from '../components/Notification';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, updateRecipe } from '../features/recipes/recipesSlice';
import { uploadImageToCloudinary } from '../services/cloudinary';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedRecipe, loading, error } = useSelector((state) => state.recipes);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    country: '',
    serving_size: '',
    image_url: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
   
    if (loading || !selectedRecipe || !user) return;
    if (String(selectedRecipe.user_id) !== String(user.id)) {
      alert('You can only edit your own recipes!');
      navigate('/');
    } else {
      setFormData({
        title: selectedRecipe.title || '',
        description: selectedRecipe.description || '',
        ingredients: Array.isArray(selectedRecipe.ingredients) 
          ? selectedRecipe.ingredients.join('\n') 
          : selectedRecipe.ingredients || '',
        instructions: selectedRecipe.instructions || '',
        country: selectedRecipe.country || '',
        serving_size: selectedRecipe.serving_size || '',
        image_url: selectedRecipe.image_url || '',
      });
    }
  }, [selectedRecipe, user, loading, navigate]);

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
      let image_url = formData.image_url;
      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        image_url = uploadResult.secure_url;
      }
      
      const serving_size = formData.serving_size ? parseInt(formData.serving_size, 10) : undefined;
     
      const ingredients = formData.ingredients
        ? formData.ingredients.split('\n').map(line => line.trim()).filter(Boolean)
        : [];
      const updatedData = {
        ...formData,
        serving_size,
        ingredients,
        image_url,
      };
      await dispatch(updateRecipe({ recipeId: id, recipeData: updatedData })).unwrap();
      setNotification('Recipe updated successfully!');
      setTimeout(() => {
        setNotification('');
        navigate(`/recipes/${id}`);
      }, 1500);
    } catch (error) {
      console.error('Failed to update recipe:', error);
      alert('Failed to update recipe.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-600">Error: {error}</div>;
  }

  if (!selectedRecipe) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100 text-center text-lg font-semibold text-gray-600">
          Recipe not found
        </div>
      </div>
    );
  }

  return (
    <>
      <Notification message={notification} type="success" onClose={() => setNotification('')} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 py-10 px-2">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10 border border-orange-100 flex flex-col gap-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-4 text-center tracking-tight drop-shadow-sm">Edit Recipe</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" encType="multipart/form-data">
            <div className="flex flex-col gap-4 md:flex-row md:gap-6">
              <div className="flex-1">
                <label htmlFor="title" className="block text-base font-semibold text-gray-700 mb-1">Recipe Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-900 shadow-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="country" className="block text-base font-semibold text-gray-700 mb-1">Country/Cuisine</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-900 shadow-sm"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 items-end">
              <div className="flex-1">
                <label htmlFor="serving_size" className="block text-base font-semibold text-gray-700 mb-1">Serving Size</label>
                <input
                  type="number"
                  id="serving_size"
                  name="serving_size"
                  value={formData.serving_size}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-900 shadow-sm"
                />
              </div>
              <div className="flex-1 flex flex-col items-center">
                <label htmlFor="image" className="block text-base font-semibold text-gray-700 mb-1 self-start">Recipe Image</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-900 shadow-sm mb-2"
                />
                {selectedRecipe.image_url && (
                  <div className="mb-2 flex flex-col items-center gap-1">
                    <img 
                      src={selectedRecipe.image_url} 
                      alt="Current recipe" 
                      className="w-16 h-16 object-cover rounded-md border border-orange-200 shadow"
                    />
                    <span className="text-xs text-gray-500">Current image</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-base font-semibold text-gray-700 mb-1">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-900 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="ingredients" className="block text-base font-semibold text-gray-700 mb-1">Ingredients (one per line) *</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="1 cup flour\n2 eggs\n1 tsp vanilla"
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-900 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="instructions" className="block text-base font-semibold text-gray-700 mb-1">Instructions *</label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                required
                rows="6"
                className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 text-gray-900 shadow-sm"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-bold text-lg shadow hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-60 transition-all duration-150"
              >
                {loading ? 'Updating...' : 'Update Recipe'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/recipes/${id}`)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-bold text-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};




export default EditRecipe;
