import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import recipesReducer from '../features/recipes/recipesSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import commentsReducer from '../features/comments/commentsSlice';
import ratingsReducer from '../features/ratings/ratingSlice';
import groupsReducer from '../features/groups/groupsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipesReducer,
  bookmarks: bookmarksReducer,
  comments: commentsReducer,
  ratings: ratingsReducer,
  groups: groupsReducer,
});

export default rootReducer;
