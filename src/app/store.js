import { configureStore } from '@reduxjs/toolkit';


function recipesReducer(state = { recipes: [] }, action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      return { recipes: [...state.recipes, action.payload] };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    recipes: recipesReducer
  }
});

export default store;