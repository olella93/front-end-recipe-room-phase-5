import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGroupById,
  fetchGroupRecipes,
  joinGroup,
  leaveGroup
} from '../features/groups/groupsSlice';
import RecipeCard from '../components/RecipeCard';
import { createRecipe } from '../features/recipes/recipesSlice';
import { uploadImageToCloudinary } from '../services/cloudinary';
import { useParams } from 'react-router-dom';

export default function GroupRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGroup, groupRecipes } = useSelector((state) => state.groups);
  const { user } = useSelector((state) => state.auth);

  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    country: '',
    serving_size: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchGroupById(id));
    dispatch(fetchGroupRecipes(id));
  }, [dispatch, id]);

  const handleJoin = () => dispatch(joinGroup(id));
  const handleLeave = () => dispatch(leaveGroup(id));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (imageFile) {
      const uploadRes = await uploadImageToCloudinary(imageFile);
      imageUrl = uploadRes.secure_url;
    }
    await dispatch(createRecipe({ ...formData, image_url: imageUrl, group_id: parseInt(id) }));
    setShowCreate(false);
    dispatch(fetchGroupRecipes(id));
  };

  if (!currentGroup) return <p>Loading group...</p>;

  return (
    <div>
      <h1>{currentGroup.name}</h1>
      <p>{currentGroup.description}</p>
      <p>Members: {currentGroup.member_count}</p>

      {user && (
        <div>
          <button onClick={handleJoin}>Join Group</button>
          <button onClick={handleLeave}>Leave Group</button>
          <button onClick={() => setShowCreate(!showCreate)}>+ Create Group Recipe</button>
        </div>
      )}

      {showCreate && (
        <form onSubmit={handleCreateRecipe}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <textarea name="ingredients" placeholder="Ingredients" value={formData.ingredients} onChange={handleChange} required />
          <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          <input type="number" name="serving_size" placeholder="Serving Size" value={formData.serving_size} onChange={handleChange} />
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          <button type="submit">Post Recipe</button>
        </form>
      )}

      <h2>Group Recipes</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        {groupRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
