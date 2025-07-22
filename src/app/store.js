import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    recipes: recipesReducer
  }
});

function recipesReducer(state = { recipes: [] }, action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      return { recipes: [...state.recipes, action.payload] };
    default:
      return state;
  }
}



export default store;