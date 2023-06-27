import { getAccessToken } from "../UserApi/userApi";

const API_BASE_URL = "http://localhost:3001/api/v1";

export const getAllRegisteredUsers = async () => {
  const token = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/admin/get-registered-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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

export const getAllBlogs = async () => {
  const token = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/admin/get-all-blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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

export const increaseVisits = async () => {
  const increment = localStorage.getItem("increment");
  if (increment) {
    return;
  }
  try {
    const response = await fetch(`${API_BASE_URL}/counter/increase-visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: "something went wrong" };
    }

    localStorage.setItem("increment", true);
    return data.data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const getTotalVisits = async () => {
  const token = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/admin/visits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: "something went wrong" };
    }

    return data.data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};
