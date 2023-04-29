import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  clearCurrentUser,
} from "../../../../lib/APIs/UserApi/userApi";

const initialState = {
  user: getCurrentUser() || null,
  isLoading: false,
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.user = clearCurrentUser();
      state.isLoading = true;
      state.error = "";
    },
    loginSuccess: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.error = "";
    },
    loginFail: (state, { payload }) => {
      state.user = clearCurrentUser();
      state.isLoading = false;
      state.error = payload;
    },
    onLogout: (state) => {
      state.user = clearCurrentUser();
      state.isLoading = false;
      state.error = "";
    },
  },
});

const { reducer, actions } = loginSlice;

export const { loginPending, loginSuccess, loginFail, onLogout } = actions;

export default reducer;
