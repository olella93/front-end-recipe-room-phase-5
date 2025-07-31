import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchBookmarksAPI, addBookmarkAPI, deleteBookmarkAPI } from './bookmarksAPI';

export const fetchBookmarks = createAsyncThunk('bookmarks/fetch', async () => {
  return await fetchBookmarksAPI();
});

export const addBookmark = createAsyncThunk('bookmarks/add', async (recipeId) => {
  return await addBookmarkAPI(recipeId);
});

export const deleteBookmark = createAsyncThunk('bookmarks/delete', async (bookmarkId) => {
  await deleteBookmarkAPI(bookmarkId);
  return bookmarkId;
});

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.list = state.list.filter((b) => b.id !== action.payload);
      });
  }
});

export default bookmarksSlice.reducer;
