import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("bookmarks")) || [], // Load from localStorage
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("bookmarks", JSON.stringify(state.items));
    },
    removeBookmark: (state, action) => {
      state.items = state.items.filter(
        (recipe) => recipe._id !== action.payload
      );
      localStorage.setItem("bookmarks", JSON.stringify(state.items));
    },
    setBookmarks: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("bookmarks", JSON.stringify(state.items));
    },
  },
});

export const { addBookmark, removeBookmark, setBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
