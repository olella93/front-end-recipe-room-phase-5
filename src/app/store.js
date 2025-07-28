import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookmarkReducer from '../features/bookmarks/bookmarkSlice';
import recipesReducer from '../features/recipes/recipesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmarks: bookmarkReducer,
    recipes: recipesReducer,
  }
});

export default store;