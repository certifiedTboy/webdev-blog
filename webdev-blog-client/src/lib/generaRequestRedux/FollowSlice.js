import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  follow_loading: false,
  follow_success: false,
  follow_error: "",
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    followLoading: (state) => {
      state.follow_Loading = true;
      state.follow_success = false;
      state.follow_error = "";
    },
    followSuccess: (state) => {
      state.follow_loading = false;
      state.follow_success = true;
      state.follow_error = "";
    },
    followFailed: (state, { payload }) => {
      state.follow_loading = false;
      state.follow_success = false;
      state.follow_error = payload;
    },
  },
});

const { reducer, actions } = followSlice;

export const { followLoading, followSuccess, followFailed } = actions;

export default reducer;
