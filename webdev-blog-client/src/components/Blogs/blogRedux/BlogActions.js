import { onGetBlog, getBlogsSuccess, getBlogFailed } from "./BlogSlice";
import { getAllBlogs } from "../../../lib/APIs/BlogAPIs/BlogAPI";

export const getBlogs = () => async (dispatch) => {
  try {
    dispatch(onGetBlog());

    const response = await getAllBlogs();
    if (response.error) {
      return dispatch(getBlogFailed({ error: response.error }));
    }
    return dispatch(getBlogsSuccess(response.data));
  } catch (error) {
    dispatch(getBlogFailed({ error: "Server Error" }));
  }
};
