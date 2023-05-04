import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getBlogs } from "../../Blogs/blogRedux/BlogActions";
import {
  publishBlog,
  getBlogById,
  deleteBlog,
} from "../../../lib/APIs/BlogAPIs/BlogAPI";
import PreviewModal from "../../PostBuilder/PreviewModal";
import classes from "./GeneralProfile.module.css";

const Details = ({ userData }) => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [totalPublishBlogs, setTotalPublishedBlogs] = useState([]);
  const [blogByUser, setBlogByUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState({
    state: false,
    btn_value: "",
  });
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [recordsPerPage] = useState(4);
  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const dispatch = useDispatch();

  //publish created blog
  const onPublishBlog = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setRequestSuccess(false);
    try {
      const response = await publishBlog(event.target.value);
      if (response.error) {
        setIsLoading(false);
        setRequestSuccess(false);
        return setErrorMessage(response.error);
      }

      setIsLoading(false);
      setRequestSuccess(true);
    } catch (error) {
      setRequestSuccess(false);
      setIsLoading(false);
    }
  };

  //get blog by blogId
  const onGetBlogById = async (event) => {
    setShowModal(false);
    setIsLoading(true);
    try {
      const response = await getBlogById(event.target.value);
      if (response.error) {
        setShowModal(false);
        setIsLoading(false);
        return setErrorMessage(response.error);
      }

      setIsLoading(false);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setContent(response.data.content);
      return setShowModal(true);
    } catch (erro) {
      setShowModal(true);
      setIsLoading(false);
      setErrorMessage("something went wrong");
    }
  };

  const onDeleteBlog = async (event) => {
    if (userEmail.trim() === "") {
      setRequestSuccess(false);
      return setErrorMessage("Email input can't be empty");
    }

    if (userEmail !== userData.email) {
      setRequestSuccess(false);
      return setErrorMessage("request failed, invalid user email");
    }

    setIsLoading(true);
    try {
      const response = await deleteBlog(event.target.value);
      if (response.error) {
        setIsLoading(false);
        setRequestSuccess(false);
        return setErrorMessage(response.error);
      }

      setRequestSuccess(true);
      return setIsLoading(false);
    } catch (erro) {
      setRequestSuccess(false);
      setIsLoading(false);
      setErrorMessage("something went wrong");
    }
  };

  useEffect(() => {
    const onGetAllBlogs = async () => {
      dispatch(getBlogs());
    };

    onGetAllBlogs();
  }, [requestSuccess, dispatch]);

  const { blogs } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.login);

  const params = useParams();
  const { username } = params;

  useEffect(() => {
    setBlogByUser(blogs.filter((blog) => blog.user.username === username));
  }, [blogs, username]);

  useEffect(() => {
    if (user.username === username) {
      return setUserBlogs(
        blogByUser.slice(indexOfFirstRecord, indexOfLastRecord)
      );
    }

    if (user.username !== username) {
      const publishedBlogs = blogByUser.filter((blog) => blog.isPublished);
      setTotalPublishedBlogs(publishedBlogs);
      return setUserBlogs(
        publishedBlogs.slice(indexOfFirstRecord, indexOfLastRecord)
      );
    }
  }, [blogByUser, blogs, username]);

  const onShowModal = () => {
    if (showModal) {
      return setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const confirmDeleteHandler = (event) => {
    if (showEmailInput.state) {
      setErrorMessage("");
      setRequestSuccess(false);
      return setShowEmailInput({ state: false, btn_value: "" });
    } else {
      setErrorMessage("");
      setRequestSuccess(false);
      return setShowEmailInput({ state: true, btn_value: event.target.value });
    }
  };

  const emailInputHandler = (event) => {
    setErrorMessage("");
    setUserEmail(event.target.value);
  };

  return (
    <>
      {showModal && (
        <PreviewModal
          title={title}
          description={description}
          content={content}
          onShowModal={onShowModal}
        />
      )}

      {errorMessage && (
        <>
          <div class="alert alert-danger text-center" role="alert">
            {errorMessage}
          </div>
        </>
      )}
      <div className="ml-2 mr-2">
        <div className="row">
          <div className="col-12">
            <div>
              <p>Articles Written</p>
            </div>

            {userBlogs.map((blog) => {
              return (
                <div className="card mb-2" key={blog._id.toString()}>
                  <div className="card-header">
                    <NavLink to={`/blogs/${blog.title}`}>{blog.title}</NavLink>
                  </div>
                  <div className={`${classes.card_body} card-body`}>
                    {user && user.username === username && (
                      <div className={classes.btn_container}>
                        {showEmailInput.btn_value !== blog._id.toString() && (
                          <button
                            value={blog._id.toString()}
                            className={`mr-1 ${classes.action_btn}`}
                            onClick={onGetBlogById}
                          >
                            View
                          </button>
                        )}
                        {showEmailInput.btn_value !== blog._id.toString() && (
                          <button
                            value={blog._id.toString()}
                            className={`mr-1 ${classes.action_btn}`}
                            onClick={onPublishBlog}
                          >
                            {blog.isPublished ? "Unpublish" : "Publish"}
                          </button>
                        )}

                        {showEmailInput.btn_value !== blog._id.toString() && (
                          <NavLink
                            to={`/blogs/edit/${blog._id}`}
                            className="mr-1"
                          >
                            Edit
                          </NavLink>
                        )}
                        <button
                          value={blog._id.toString()}
                          className={`${classes.delete_btn}`}
                          onClick={confirmDeleteHandler}
                        >
                          {showEmailInput.btn_value === blog._id.toString()
                            ? "Cancle"
                            : "Delete"}
                        </button>
                      </div>
                    )}
                    {showEmailInput.btn_value === blog._id.toString() && (
                      <div className={classes.input_container}>
                        <input
                          className={`${classes.email_input}`}
                          placeholder="Enter email to confirm"
                          onChange={emailInputHandler}
                        />{" "}
                        <button
                          value={showEmailInput.btn_value}
                          className={`${classes.confirm_btn}`}
                          onClick={onDeleteBlog}
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {user.username === username && (
              <div>
                {blogByUser.length > 4 && (
                  <a href="#">
                    {blogByUser.length - userBlogs.length} more blogs...
                  </a>
                )}
              </div>
            )}

            {user.username !== username && (
              <div>
                {totalPublishBlogs.length > 4 && (
                  <a href="#">
                    {totalPublishBlogs.length - userBlogs.length} more blogs...
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
