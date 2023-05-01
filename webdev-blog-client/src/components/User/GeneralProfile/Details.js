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
  const params = useParams();
  const { username } = params;
  const blogByUser = blogs.filter((blog) => blog.user.username === username);

  useEffect(() => {
    if (blogByUser.length > 0) {
      setUserBlogs(blogs.slice(indexOfFirstRecord, indexOfLastRecord));
    }
  }, [blogByUser.length, blogs, indexOfFirstRecord, indexOfLastRecord]);

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
                  <div className="card-header">{blog.title}</div>
                  <div className={`${classes.card_body} card-body`}>
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
            <div>
              <a href="#">
                {blogByUser.length - userBlogs.length} more blogs...
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
