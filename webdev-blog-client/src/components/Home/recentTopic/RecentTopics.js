import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { getBlogs } from "../../Blogs/blogRedux/BlogActions";
import MiniLoader from "../../UI/Loader/MiniLoader";
import "./RecentTopic.css";

const RecentTopic = () => {
  const [recordsPerPage] = useState(3);
  const [recentBlogs, setRecentBlogs] = useState([]);

  const dispatch = useDispatch();

  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  let { blogs, isLoading, errorMessage } = useSelector((state) => state.blog);

  useEffect(() => {
    if (blogs.length > 0) {
      setRecentBlogs(blogs.slice(indexOfFirstRecord, indexOfLastRecord));
    }
  }, [blogs, indexOfFirstRecord, indexOfLastRecord]);

  const loadingData = <MiniLoader />;

  return (
    <div className="latest-news pt-150 pb-150 mt-5" id="blogs">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="section-title">
              <h3>
                <span className="orange-text">Recent</span> Blogs
              </h3>
              <p>Read our recent blogs</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            {isLoading && loadingData}
            {errorMessage && (
              <>
                <div class="alert alert-danger text-center" role="alert">
                  {errorMessage.error}
                </div>
                <a className="btn btn-warning" href="/home">
                  Reload Page
                </a>
              </>
            )}
          </div>
          {!isLoading &&
            !errorMessage &&
            recentBlogs.map((blog) => {
              return (
                <div className="col-lg-4 col-md-6" key={blog.id}>
                  <div className="single-latest-news">
                    <div className="latest-news-bg news-bg-1"></div>

                    <div className="news-text-box">
                      <h3>{blog.title}</h3>
                      <p className="blog-meta">
                        <span className="author">
                          <i className="fas fa-user"></i>{" "}
                          <NavLink to={`/w-d/${blog.user.username}`}>
                            {" "}
                            {blog.user.firstName} {blog.user.lastName}
                          </NavLink>
                        </span>
                        <span className="date">
                          <i className="fas fa-calendar"></i>
                          <Moment className="meta-own" fromNow>
                            {blog.createdAt}
                          </Moment>
                        </span>
                      </p>
                      <p className="excerpt">{blog.description}</p>
                      <NavLink
                        to={`/blogs/${blog.title}`}
                        className="read-more-btn"
                      >
                        read more <i className="fas fa-angle-right"></i>
                      </NavLink>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="row">
          {!isLoading && !errorMessage && (
            <div className="col-12 text-center">
              <NavLink to="/blogs" className="boxed-btn">
                View More
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentTopic;
