import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  isLoading: false,
  errorMessage: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    onGetBlog: (state) => {
      state.blogs = [];
      state.isLoading = true;
      state.errorMessage = null;
    },
    getBlogsSuccess: (state, { payload }) => {
      state.blogs = payload;
      state.isLoading = false;
      state.errorMessage = null;
    },
    getBlogFailed: (state, { payload }) => {
      state.blogs = [];
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

const { reducer, actions } = blogSlice;

export const { onGetBlog, getBlogsSuccess, getBlogFailed } = actions;

export default reducer;
