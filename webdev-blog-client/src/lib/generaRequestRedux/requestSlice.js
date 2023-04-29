import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: { successMessage: null, successStatus: false, successType: "" },
  error: "",
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    requestLoading: (state) => {
      state.isLoading = true;
      state.success = {
        successMessage: null,
        successStatus: false,
        successType: "",
      };
      state.error = "";
    },
    requestSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.success = {
        successMessage: payload.message,
        successStatus: true,
        successType: payload.type,
      };
      state.error = "";
    },
    requestFailed: (state, { payload }) => {
      state.isLoading = false;
      state.success = {
        successMessage: null,
        successStatus: false,
        successType: "",
      };
      state.error = payload;
    },
  },
});

const { reducer, actions } = requestSlice;

export const { requestLoading, requestSuccess, requestFailed } = actions;

export default reducer;
