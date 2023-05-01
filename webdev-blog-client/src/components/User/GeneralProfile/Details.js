import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getBlogs } from "../../Blogs/blogRedux/BlogActions";
import classes from "./GeneralProfile.module.css";
const Details = ({ userData }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const onGetAllBlogs = async () => {
      dispatch(getBlogs());
    };

    onGetAllBlogs();
  }, []);

  const { user } = useSelector((state) => state.login);
  const { blogs } = useSelector((state) => state.blog);
  const params = useParams();
  const { username } = params;
  const blogByUser = blogs.filter((blog) => blog.user.username === username);
  return (
    <div className="ml-2">
      <div className="row">
        {user && user.username === userData.username && (
          <div className="col-4">
            <div>
              <p>Reading List...</p>
            </div>
          </div>
        )}
        <div
          className={`${
            user && user.username === userData.username ? "col-6" : "col-12"
          }`}
        >
          <div>
            <p>Articles Written</p>
          </div>

          {blogs.map((blog) => {
            return (
              <div className="card mb-2" key={blog._id.toString()}>
                <div className="card-header">{blog.title}</div>
                <div className={`${classes.card_body} card-body text-center`}>
                  <a style={{ float: "left" }} href="#">
                    View
                  </a>
                  <a href="#">{blog.isPublished ? "Unpublish" : "Publish"}</a>

                  <NavLink
                    style={{ float: "right" }}
                    to={`/blogs/edit/${blog._id}`}
                  >
                    Edit
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
