import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ReactComponent as GoogleLogo } from "../../../Assets/google.svg";
import getGoogleUrl from "../../../lib/APIs/AuthApis/getGoogleUrl";
import { newUserLogin } from "./loginRedux/loginActions";
import {
  createEmailVerification,
  verifyEmailCreated,
} from "../../../lib/generaRequestRedux/requestActions";
import MiniLoader from "../../UI/Loader/MiniLoader";
import classes from "./login.module.css";

const Login = () => {
  //email login state
  const [firstLogin, setFirstLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generaErrorMessage, setGeneralErrorMessage] = useState("");

  const params = useParams();
  const { verificationData } = params;

  const { isLoading: loginLoading, error } = useSelector(
    (state) => state.login
  );
  const {
    isLoading,
    success,
    error: requestError,
  } = useSelector((state) => state.request);

  //google oauth login state
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();

  const firstLoginHandler = () => {
    if (firstLogin) {
      setFirstLogin(false);
    } else {
      setFirstLogin(true);
    }
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const createUserOnFirstLogin = async (event) => {
    event.preventDefault();
    const emailData = { email };
    await dispatch(createEmailVerification(emailData));
  };

  const loginUserHandler = async (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    dispatch(newUserLogin(loginData));
  };

  useEffect(() => {
    const onLoginFail = () => {
      setGeneralErrorMessage(error.error);
    };
    onLoginFail();
  }, [error]);

  useEffect(() => {
    const onRequestFailed = () => {
      setGeneralErrorMessage(requestError.error);
    };
    onRequestFailed();
  }, [requestError.error]);

  useEffect(() => {
    if (verificationData) {
      const data = atob(verificationData).split(":");
      const emailDataToVerify = {
        verificationId: data[1],
        verificationToken: data[0],
      };
      dispatch(verifyEmailCreated(emailDataToVerify));
    }
  }, [verificationData]);

  return (
    <div className={`container ${classes.formBorder}`}>
      <div className="row">
        <div className="col-lg-4 col-md-3 col-1"></div>
        <div className="col-lg-4 col-md-6 col-10">
          <div>
            <p className={classes.togglePara}>
              {firstLogin ? "Have an account ?" : "Don't have an account ?"}
              <button className={classes.toggleBtn} onClick={firstLoginHandler}>
                {" "}
                {firstLogin ? "Signin" : "Signup"}
              </button>
            </p>
          </div>
          {generaErrorMessage && (
            <div class="alert alert-danger" role="alert">
              {generaErrorMessage}
            </div>
          )}

          {success.successMessage && (
            <div class="alert alert-success" role="alert">
              {success.successMessage}
            </div>
          )}
          {loginLoading && <MiniLoader />}
          {isLoading && <MiniLoader />}

          <form
            onSubmit={!firstLogin ? loginUserHandler : createUserOnFirstLogin}
          >
            <div className="form-group">
              <input
                className="form-control"
                placeholder="enter email"
                type="text"
                onChange={emailChangeHandler}
              />
            </div>
            {!firstLogin && (
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="password"
                  type="password"
                  onChange={passwordChangeHandler}
                />
              </div>
            )}
            <div className="form-group">
              <input
                className={`form-control ${classes.btn}`}
                value={!firstLogin ? "Login" : "Create account"}
                type="submit"
              />
            </div>
          </form>

          <div>
            <a href={getGoogleUrl(from)} target="_blank" rel="noreferrer">
              <GoogleLogo style={{ height: "2rem" }} />
              Login with Google
            </a>
          </div>
        </div>
        <div className="col-lg-4 col-md-3 col-1"></div>
      </div>
    </div>
  );
};

export default Login;
