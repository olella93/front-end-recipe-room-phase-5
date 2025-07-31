import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe } from '../features/recipes/recipesSlice';
import { uploadImageToCloudinary } from '../services/cloudinary';
import { useNavigate } from 'react-router-dom';

export default function CreateRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    country: '',
    serving_size: '',
    group_id: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    return <p>You must be logged in to create a recipe.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = '';
      if (imageFile) {
        const uploadRes = await uploadImageToCloudinary(imageFile);
        imageUrl = uploadRes.secure_url;
      }

      const payload = {
        ...formData,
        image_url: imageUrl || undefined,
        serving_size: formData.serving_size ? parseInt(formData.serving_size) : undefined,
        group_id: formData.group_id ? parseInt(formData.group_id) : undefined
      };

      await dispatch(createRecipe(payload)).unwrap();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container recipe-form-container">
      <h1 className="form-title">Create a Recipe</h1>
      {error && <p className="form-error">{error}</p>}
      <form className="form recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients</label>
          <textarea id="ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea id="instructions" name="instructions" value={formData.instructions} onChange={handleChange} required />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input id="country" type="text" name="country" value={formData.country} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="serving_size">Serving Size</label>
            <input id="serving_size" type="number" name="serving_size" value={formData.serving_size} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="group_id">Group ID (optional)</label>
            <input id="group_id" type="number" name="group_id" value={formData.group_id} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input id="image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <button className="form-btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Recipe'}</button>
      </form>
    </div>
  );
}
