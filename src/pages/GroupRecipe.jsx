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
  const { currentGroup, groupRecipes } = useSelector((state) => state.groups);
  const { user } = useSelector((state) => state.auth);
  // Debug: log currentGroup and user
  console.log('currentGroup:', currentGroup);
  console.log('user:', user);
  const { id } = useParams();
  const dispatch = useDispatch();

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

  const isOwner = user && currentGroup.current_user_is_admin;
  const isMember = user && currentGroup.current_user_is_member;

  const handleDeleteGroup = () => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      dispatch({ type: 'groups/deleteGroup', payload: currentGroup.id });
    }
  };

  return (
    <div>
      <h1>{currentGroup.name}</h1>
      <p>{currentGroup.description}</p>
      <p>Members: {currentGroup.member_count}</p>

      {user && (
        <div>
          {user && !isMember && (
            <button onClick={handleJoin}>Join Group</button>
          )}
          {user && isMember && !isOwner && (
            <button onClick={handleLeave}>Leave Group</button>
          )}
          <button onClick={() => setShowCreate(!showCreate)}>+ Create Group Recipe</button>
          {user && isOwner && (
            <button onClick={handleDeleteGroup} style={{ background: 'red', color: 'white', marginLeft: '1rem' }}>
              Delete Group
            </button>
          )}
        </div>
      )}

      {showCreate && (
        <form onSubmit={handleCreateRecipe} style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          padding: '2rem',
          margin: '2rem 0',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required style={{
            padding: '0.7rem 1rem',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            background: '#fafbfc',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required style={{
            padding: '0.7rem 1rem',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            background: '#fafbfc',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            minHeight: '60px',
          }} />
          <textarea name="ingredients" placeholder="Ingredients" value={formData.ingredients} onChange={handleChange} required style={{
            padding: '0.7rem 1rem',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            background: '#fafbfc',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            minHeight: '60px',
          }} />
          <textarea name="instructions" placeholder="Instructions" value={formData.instructions} onChange={handleChange} required style={{
            padding: '0.7rem 1rem',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            background: '#fafbfc',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            minHeight: '60px',
          }} />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} style={{
            padding: '0.7rem 1rem',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            background: '#fafbfc',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }} />
          <input type="number" name="serving_size" placeholder="Serving Size" value={formData.serving_size} onChange={handleChange} style={{
            padding: '0.7rem 1rem',
            borderRadius: '12px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            background: '#fafbfc',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>Image:</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={{
              padding: '0.5rem',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              background: '#fafbfc',
            }} />
          </div>
          <button type="submit" style={{
            padding: '0.9rem 2rem',
            borderRadius: '12px',
            border: 'none',
            background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ff5f6d 0%, #ffc371 100%)'}
            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)'}
          >
            Post Recipe
          </button>
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
