import { followSuccess, followFailed, followLoading } from "./FollowSlice";
import { followUser } from "../APIs/UserApi/userApi";

export const onFollowUser = (username) => async (dispatch) => {
  try {
    dispatch(followLoading());

    const response = await followUser(username);
    if (response.error) {
      return dispatch(followFailed({ error: response.error }));
    } else {
      return dispatch(followSuccess());
    }
  } catch (error) {
    dispatch(followFailed({ error: "Something went wrong" }));
  }
};
