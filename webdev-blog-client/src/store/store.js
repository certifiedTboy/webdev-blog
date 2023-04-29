import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../components/Blogs/blogRedux/BlogSlice";
import loginReducer from "../components/Auth/login/loginRedux/loginSlice";
import requestReducer from "../lib/generaRequestRedux/requestSlice";
import profileReducer from "../lib/generaRequestRedux/profileSlice";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    login: loginReducer,
    request: requestReducer,
    profile: profileReducer,
  },
});

export default store;
