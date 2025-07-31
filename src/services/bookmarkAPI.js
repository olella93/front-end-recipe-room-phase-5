import API from './api';

export const fetchBookmarksAPI = async (token) => {
  const res = await API.get('/bookmarks', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const addBookmarkAPI = async (recipe_id, token) => {
  const res = await API.post('/bookmarks', { recipe_id }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const removeBookmarkAPI = async (bookmark_id, token) => {
  const res = await API.delete(`/bookmarks/${bookmark_id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
