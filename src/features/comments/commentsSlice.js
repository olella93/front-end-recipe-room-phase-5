import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCommentAPI, updateCommentAPI, deleteCommentAPI } from './commentsAPI';
import { fetchCommentsAPI } from '../recipes/recipesAPI';

// Fetch comments for a recipe
export const fetchComments = createAsyncThunk('comments/fetch', async (recipeId) => {
  return await fetchCommentsAPI(recipeId);
});

// Create comment
export const createComment = createAsyncThunk('comments/create', async ({ recipeId, text }) => {
  return await createCommentAPI(recipeId, text);
});

// Update comment
export const updateComment = createAsyncThunk('comments/update', async ({ commentId, text }) => {
  return await updateCommentAPI(commentId, text);
});

// Delete comment
export const deleteComment = createAsyncThunk('comments/delete', async (commentId) => {
  await deleteCommentAPI(commentId);
  return commentId;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const idx = state.list.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  }
});

export default commentsSlice.reducer;
