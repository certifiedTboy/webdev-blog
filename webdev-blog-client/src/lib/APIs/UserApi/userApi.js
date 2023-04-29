const API_BASE_URL = "http://localhost:3001/api/v1";

export const getAccessToken = () => {
  const token = localStorage.getItem("accessJWT");
  if (!token) {
    return;
  }
  return token;
};

export const getCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("C_U"));
  if (!currentUser) {
    return;
  }
  return currentUser;
};

export const clearCurrentUser = () => {
  localStorage.removeItem("accessJWT");
};

export const updateUserDetails = async (updateData) => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/update-user`, {
      method: "PUT",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
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

export const uploadImage = async (image) => {
  const authToken = localStorage.getItem("accessJWT");
  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch(
      "http://localhost:3001/api/v1/user/upload-image",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${authToken}`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return { error: data.message };
    }
    return data.message;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${username}`, {
      method: "GET",
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

export const getProfilePicture = async () => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile-picture`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    return data.data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const getUserPicture = async (username) => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(
      `${API_BASE_URL}/user/profile-picture/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    return data.data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};
