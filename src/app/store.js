import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookmarkReducer from '../features/bookmarks/bookmarkSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmarks: bookmarkReducer,
  }
});

export default store;