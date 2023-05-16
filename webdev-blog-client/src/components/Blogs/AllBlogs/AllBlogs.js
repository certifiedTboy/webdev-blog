import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";
import useLoadBlogs from "./useLoadBlogs";
import DescriptionPopUp from "./DescriptionPopUp";
import LoadingPlaceHolder from "./LoadingPlaceHolder";
import "./AllBlogs.css";

const AllBlogs = () => {
  const [page, setPage] = useState(1);

  const [showA, setShowA] = useState({ state: false, key: "" });

  const { newBlogs, hasMore, loading, error } = useLoadBlogs(page);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setPage(page + 1);
      }
    };
    if (hasMore) {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [page, hasMore]);

  let blogContent = newBlogs.map((blog) => {
    return (
      <div key={blog._id}>
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
                  {blog.user.firstName} {blog.user.lastName}
                </NavLink>
              </span>
              <span className="date">
                <i className="fas fa-calendar"></i>{" "}
                <Moment className="meta-own" fromNow>
                  {blog.createdAt}
                </Moment>
              </span>
            </p>
            {showA.key === blog._id && (
              <DescriptionPopUp
                showA={showA.state}
                description={blog.description}
              />
            )}
            <div onMouseOver={() => setShowA({ state: true, key: blog._id })}>
              <p className="excerpt">{blog.description.substr(0, 38)}...</p>
            </div>
            <NavLink to={`/blogs/${blog.title}`} className="read-more-btn">
              read more <i className="fas fa-angle-right"></i>
            </NavLink>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="col-12 text-center">
            {error.error && (
              <>
                <div className="alert alert-danger text-center" role="alert">
                  {error.error}
                </div>
                <a className="btn btn-warning" href="/blogs">
                  Reload Page
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className=" col-1 col-md-2"></div>
        <div className=" col-10 col-md-8">
          {" "}
          {blogContent} {loading && <LoadingPlaceHolder />}
        </div>
        <div className="col-1 col-md-2 ">
          <div className="d-none d-sm-none d-md-none d-lg-block">
            <h1>Empty for Advert Placement</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
