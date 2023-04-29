import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUserProfilePicture: undefined,
  otherUserProfilePicture: undefined,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getCurrentUserProfilePicture: (state, { payload }) => {
      state.currentUserProfilePicture = payload;
    },
    getOtherUserProfilePicture: (state, { payload }) => {
      state.otherUserProfilePicture = payload;
    },
  },
});

const { reducer, actions } = profileSlice;

export const { getCurrentUserProfilePicture, getOtherUserProfilePicture } =
  actions;

export default reducer;
