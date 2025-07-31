// Delete recipe
export const deleteRecipeAPI = async (recipeId) => {
  const res = await axios.delete(
    `${API_BASE_URL}/recipes/${recipeId}`,
    { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
  );
  return res.data;
};
import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import authHeader from '../../utils/authHeader';

// Fetch all recipes (with optional filters)
export const fetchRecipesAPI = async (filters = {}) => {
  const params = {};
  if (filters.country) params.country = filters.country;
  if (filters.min_rating) params.min_rating = filters.min_rating;
  if (filters.serving_size) params.serving_size = filters.serving_size;
  const res = await axios.get(`${API_BASE_URL}/recipes`, { params });
  return res.data;
};

// Search recipes by keyword
export const searchRecipesAPI = async (query) => {
  const res = await axios.get(`${API_BASE_URL}/recipes/search`, { params: { query } });
  return res.data.recipes || [];
};

// Fetch single recipe
export const fetchRecipeByIdAPI = async (id) => {
  const headers = authHeader();
  const res = await axios.get(`${API_BASE_URL}/recipes/${id}`, {
    headers: Object.keys(headers).length ? headers : undefined
  });
  return res.data;
};

// Create a new recipe 
export const createRecipeAPI = async (recipeData) => {
  let headers = authHeader();
  
  if (!(recipeData instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const res = await axios.post(`${API_BASE_URL}/recipes`, recipeData, { headers });
  return res.data;
};

// Get comments for a recipe
export const fetchCommentsAPI = async (recipeId) => {
  const res = await axios.get(`${API_BASE_URL}/comments/${recipeId}`);
  return res.data;
};

// Submit rating
export const submitRatingAPI = async (recipeId, value) => {
  const res = await axios.post(
    `${API_BASE_URL}/recipes/${recipeId}/rate`,
    { value },
    { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
  );
  return res.data;
};

// Update recipe
export const updateRecipeAPI = async (recipeId, recipeData) => {
  const res = await axios.put(`${API_BASE_URL}/recipes/${recipeId}`, recipeData, {
    headers: { ...authHeader(), 'Content-Type': 'application/json' }
  });
  return res.data;
};
