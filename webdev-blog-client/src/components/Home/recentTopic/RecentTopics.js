import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import DescriptionPopUp from "../../Blogs/AllBlogs/DescriptionPopUp";
import { getAllBlogs } from "../../../lib/APIs/BlogAPIs/BlogAPI";
import MiniLoader from "../../UI/Loader/MiniLoader";
import "./RecentTopic.css";

const RecentTopic = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recordsPerPage] = useState(3);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [showA, setShowA] = useState({ state: false, key: "" });

  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    const onGetBlogs = async () => {
      setIsLoading(true);
      const response = await getAllBlogs(1);

      if (response.error) {
        setIsLoading(false);
        return setErrorMessage(response);
      }

      setIsLoading(false);
      return setBlogs(response.data);
    };

    onGetBlogs();
  }, []);

  useEffect(() => {
    const publishedBlogs = blogs.filter((blog) => blog.isPublished);
    if (publishedBlogs.length > 0) {
      setRecentBlogs(
        publishedBlogs.slice(indexOfFirstRecord, indexOfLastRecord)
      );
    }
  }, [blogs, indexOfFirstRecord, indexOfLastRecord]);

  const loadingData = <MiniLoader />;

  const toggleShowA = () => setShowA(!showA);

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
            {errorMessage.error && (
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
            recentBlogs.map((blog) => {
              return (
                <div className="col-lg-4 col-md-6" key={blog.id}>
                  <div
                    className="single-latest-news"
                    onClick={() => setShowA({ state: false, key: "" })}
                  >
                    <div className="latest-news-bg news-bg-1"></div>

                    <div className="news-text-box">
                      <h5>{blog.title}</h5>

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

                      {showA.key === blog._id.toString() && (
                        <DescriptionPopUp
                          showA={showA.state}
                          description={blog.description}
                        />
                      )}
                      <div
                        onMouseOver={() =>
                          setShowA({ state: true, key: blog._id.toString() })
                        }
                      >
                        <p className="excerpt">
                          {blog.description.substr(0, 38)}...
                        </p>
                      </div>

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
