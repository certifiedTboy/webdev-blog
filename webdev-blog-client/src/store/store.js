import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../lib/generaRequestRedux/BlogSlice";
import loginReducer from "../components/Auth/login/loginRedux/loginSlice";
import requestReducer from "../lib/generaRequestRedux/requestSlice";
import profileReducer from "../lib/generaRequestRedux/profileSlice";
import followReducer from "../lib/generaRequestRedux/FollowSlice";

const store = configureStore({
  reducer: {
    blog: blogReducer,
    login: loginReducer,
    request: requestReducer,
    profile: profileReducer,
    follow: followReducer,
  },
});

export default store;
