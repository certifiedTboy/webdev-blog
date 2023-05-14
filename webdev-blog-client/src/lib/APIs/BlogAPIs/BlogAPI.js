import { getAccessToken } from "../UserApi/userApi";
const API_BASE_URL = "http://localhost:3001/api/v1";

export const getAllBlogs = async (pageNum) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog?page=${pageNum}&limit=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const getAllBlogsByUser = async (username) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/get-blogs-by-user/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const getABlog = async (title) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "applicationn/json",
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

export const checkBlogAlreadyCreated = async (title) => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/edit/check-that-blog-exist/${title}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "applicationn/json",
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const getBlogById = async (blogId) => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/blog/edit/${blogId}`, {
      method: "GET",
      headers: {
        "Content-Type": "applicationn/json",
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

export const createBlog = async (blogData) => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/blog/create-blog`, {
      method: "POST",
      body: JSON.stringify(blogData),
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

export const updateBlog = async (blogData, blogId) => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/blog/update-blog/${blogId}`, {
      method: "PUT",
      body: JSON.stringify(blogData),
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

export const publishBlog = async (blogId) => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/publish-blog/${blogId}`,
      {
        method: "POST",
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

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const reactToBlog = async (reaction, blogId) => {
  const authToken = getAccessToken();
  const reactionData = {
    reaction,
  };
  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/react-to-blog/${blogId}`,
      {
        method: "POST",
        body: JSON.stringify(reactionData),
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

    return data;
  } catch (error) {
    return { error: "something went wrong" };
  }
};

export const deleteBlog = async (blogId) => {
  const authToken = getAccessToken();
  try {
    const response = await fetch(`${API_BASE_URL}/blog/delete-blog/${blogId}`, {
      method: "DELETE",
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
