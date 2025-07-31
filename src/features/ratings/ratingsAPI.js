import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import authHeader from '../../utils/authHeader';

// Submit a rating for a recipe
export const submitRatingAPI = async (recipeId, value) => {
  if (!value || isNaN(value)) throw new Error("Rating value is required");

  const res = await axios.post(
    `${API_BASE_URL}/recipes/${recipeId}/rate`,
    { value }, 
    { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
  );

  return res.data;
};
