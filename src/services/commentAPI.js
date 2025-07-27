import API from './api';

export const fetchComments = async (recipeId) => {
  const res = await API.get(`/comments/recipe/${recipeId}`);
  return res.data;
};

export const postComment = async (recipeId, commentData) => {
  const res = await API.post(`/comments/recipe/${recipeId}`, commentData);
  return res.data;
};

export const updateComment = async (commentId, commentData) => {
  const res = await API.put(`/comments/${commentId}`, commentData);
  return res.data;
};
