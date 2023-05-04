import { onGetBlog, getBlogsSuccess, getBlogFailed } from "./BlogSlice";
import { getAllBlogs } from "../../../lib/APIs/BlogAPIs/BlogAPI";

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch(onGetBlog());

    const response = await getAllBlogs();
    if (response.error) {
      return dispatch(getBlogFailed({ error: response.error }));
    }

    response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return dispatch(getBlogsSuccess(response.data));
  } catch (error) {
    dispatch(getBlogFailed({ error: "Server Error" }));
  }
};
