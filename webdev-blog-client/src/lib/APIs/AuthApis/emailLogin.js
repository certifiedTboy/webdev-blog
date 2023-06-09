import { clearCurrentUser } from "../UserApi/userApi";
const API_BASE_URL = "http://localhost:3001/api/v1";

export const loginUserWithEmail = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message };
    }

    const TIMESTAMP = Date.now();
    const expiresAt = TIMESTAMP + 1000 * 60 * 60 * 24;
    localStorage.setItem("accessJWT", data.data.authToken);
    localStorage.setItem("C_U", JSON.stringify(data.data.userData));
    localStorage.setItem("expiresAt", expiresAt);

    return { message: data.message, user: data.data.userData };
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const createEmailForVerification = async (emailData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify/email`, {
      method: "POST",
      body: JSON.stringify(emailData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const verifyEmail = async (verificationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/verify/email/create-user`, {
      method: "POST",
      body: JSON.stringify(verificationData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const googleLogin = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/google/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    const TIMESTAMP = Date.now();
    const expiresAt = TIMESTAMP + 1000 * 60 * 60 * 24;
    localStorage.setItem("accessJWT", data.data.authToken);
    localStorage.setItem("C_U", JSON.stringify(data.data.userData));
    localStorage.setItem("expiresAt", expiresAt);

    return { message: data.message, user: data.data.userData };
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const logOut = async () => {
  localStorage.removeItem("accessJWT");
  localStorage.removeItem("C_U");
  localStorage.removeItem("expiresAt");

  return { message: "success" };
};
