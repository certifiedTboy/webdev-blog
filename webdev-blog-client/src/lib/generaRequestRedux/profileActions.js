import { getProfilePicture, getUserPicture } from "../APIs/UserApi/userApi";
import {
  getCurrentUserProfilePicture,
  getOtherUserProfilePicture,
} from "./profileSlice";

export const getUserProfilePicture = () => async (dispatch) => {
  const response = await getProfilePicture();

  dispatch(getCurrentUserProfilePicture(response.profilePicture));
};

export const onGetOtherUserProfilePicture = (username) => async (dispatch) => {
  const response = await getUserPicture(username);
  dispatch(getOtherUserProfilePicture(response.profilePicture));
};
