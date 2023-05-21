import { loginFail, loginPending, loginSuccess } from "./loginSlice";

import {
  loginUserWithEmail,
  googleLogin,
} from "../../../../lib/APIs/AuthApis/emailLogin";

export const newUserLogin = (frmDt) => async (dispatch) => {
  if (frmDt.email.trim().length === 0 || frmDt.password.trim().length === 0) {
    return dispatch(loginFail({ error: "input field can't be empty" }));
  }

  if (frmDt.email.trim().length === 0) {
    return dispatch(loginFail({ error: "input field can't be empty" }));
  }
  try {
    dispatch(loginPending());

    const response = await loginUserWithEmail(frmDt);
    if (response.error) {
      dispatch(loginFail({ error: response.error }));
    } else {
      dispatch(loginSuccess(response.user));
    }
  } catch (error) {
    dispatch(loginFail({ error: "something went wrong" }));
  }
};

export const loginWithGoogle = (userData) => async (dispatch) => {
  try {
    const response = await googleLogin(userData);
    if (response.error) {
      dispatch(loginFail({ error: response.error }));
    } else {
      dispatch(loginSuccess(response.user));
    }
  } catch (error) {
    dispatch(loginFail({ error: "something went wrong" }));
  }
};
