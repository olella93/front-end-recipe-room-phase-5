import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import authHeader from '../../utils/authHeader';

// Fetch all bookmarks for the logged-in user
export const fetchBookmarksAPI = async () => {
  const res = await axios.get(`${API_BASE_URL}/bookmarks`, { headers: authHeader() });
  return res.data;
};

// Add a new bookmark
export const addBookmarkAPI = async (recipeId) => {
  const res = await axios.post(
    `${API_BASE_URL}/bookmarks`,
    { recipe_id: recipeId },
    { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
  );
  return res.data;
};

// Delete a bookmark
export const deleteBookmarkAPI = async (bookmarkId) => {
  const res = await axios.delete(`${API_BASE_URL}/bookmarks/${bookmarkId}`, { headers: authHeader() });
  return res.data;
};
