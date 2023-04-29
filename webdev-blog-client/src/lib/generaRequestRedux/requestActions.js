import { requestLoading, requestSuccess, requestFailed } from "./requestSlice";
import {
  createEmailForVerification,
  verifyEmail,
} from "../APIs/AuthApis/emailLogin";
import { updateUserDetails, uploadImage } from "../APIs/UserApi/userApi";

export const createEmailVerification = (formDt) => async (dispatch) => {
  if (formDt.email.trim().length === 0) {
    return dispatch(requestFailed({ error: "input field can't be empty" }));
  }

  if (!formDt.email.includes("@")) {
    return dispatch(requestFailed({ error: "invalid email address" }));
  }
  try {
    dispatch(requestLoading());

    const response = await createEmailForVerification(formDt);

    if (response.error) {
      return dispatch(requestFailed({ error: response.error }));
    } else {
      return dispatch(
        requestSuccess({
          message: `A mail has been sent to ${formDt.email}`,
          type: "email-creation",
        })
      );
    }
  } catch (error) {
    dispatch(requestFailed({ error: "Something went wrong" }));
  }
};

export const verifyEmailCreated = (data) => async (dispatch) => {
  try {
    dispatch(requestLoading());

    const response = await verifyEmail(data);

    if (response.error) {
      return dispatch(requestFailed({ error: response.error }));
    } else {
      return dispatch(
        requestSuccess({
          message:
            "Email verification is successful, provide a valid password to complete registration",
          type: "email-verification",
        })
      );
    }
  } catch (error) {
    dispatch(requestFailed({ error: "Something went wrong" }));
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    dispatch(requestLoading());

    const response = await updateUserDetails(formData);
    if (response.error) {
      return dispatch(requestFailed({ error: response.error }));
    } else {
      return dispatch(
        requestSuccess({ message: "update success", type: "user-update" })
      );
    }
  } catch (error) {
    dispatch(requestFailed({ error: "Something went wrong" }));
  }
};

export const uploadUserImage = (imageData) => async (dispatch) => {
  try {
    dispatch(requestLoading());

    const response = await uploadImage(imageData);
    if (response.error) {
      return dispatch(requestFailed({ error: response.error }));
    } else {
      return dispatch(
        requestSuccess({ message: response.message, type: "image-upload" })
      );
    }
  } catch (error) {
    dispatch(requestFailed({ error: "Something went wrong" }));
  }
};
