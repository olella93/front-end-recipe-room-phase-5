import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { submitRatingAPI } from './ratingsAPI';

export const submitRating = createAsyncThunk(
  'ratings/submit',
  async ({ recipeId, value }, { rejectWithValue }) => {
    try {
      return await submitRatingAPI(recipeId, value);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue(err.message || "Failed to submit rating");
    }
  }
);

const ratingSlice = createSlice({
  name: 'ratings',
  initialState: {
    submitting: false,
    error: null,
    success: null
  },
  reducers: {
    clearRatingState(state) {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.pending, (state) => {
        state.submitting = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = action.payload.message || "Rating submitted successfully";
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload || "Failed to submit rating";
      });
  }
});

export const { clearRatingState } = ratingSlice.actions;
export default ratingSlice.reducer;
