import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import authHeader from '../../utils/authHeader';

// Create comment
export const createCommentAPI = async (recipeId, text) => {
  const res = await axios.post(
    `${API_BASE_URL}/comments/`,
    { recipe_id: recipeId, text },
    { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
  );
  return res.data;
};

// Update comment
export const updateCommentAPI = async (commentId, text) => {
  const res = await axios.put(
    `${API_BASE_URL}/comments/${commentId}`,
    { text },
    { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
  );
  return res.data;
};

// Delete comment
export const deleteCommentAPI = async (commentId) => {
  const res = await axios.delete(
    `${API_BASE_URL}/comments/${commentId}`,
    { headers: authHeader() }
  );
  return res.data;
};
