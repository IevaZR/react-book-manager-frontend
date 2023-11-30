import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("user")) ||null
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    setCurrentUserFavourites: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        readingListBooks: action.payload,
      };
    },
  },
});

export const { setCurrentUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
