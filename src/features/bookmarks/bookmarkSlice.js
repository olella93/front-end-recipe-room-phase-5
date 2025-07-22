import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    bookmarks: [], 
  },
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (recipe) => recipe._id !== action.payload
      );
    },
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
  },
});

export const { addBookmark, removeBookmark, setBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
