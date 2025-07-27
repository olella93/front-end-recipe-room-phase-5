import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.items = action.payload;
    },
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    editComment: (state, action) => {
      const index = state.items.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setComments, addComment, editComment } = commentSlice.actions;
export default commentSlice.reducer;
