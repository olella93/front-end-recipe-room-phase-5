import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle',
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { addRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;