import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import Loader from "../../UI/Loader/Loader";
import MiniLoader from "../../UI/Loader/MiniLoader";
import Pagination from "../pagination/Pagination";
import "./AllBlogs.css";

const AllBlogs = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const { blogs, isLoading, errorMessage } = useSelector((state) => state.blog);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(6);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  setTimeout(() => {
    setLoadingPage(false);
  }, 2000);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let currentRecords;
  let nPages;

  if (blogs.length > 0) {
    currentRecords = blogs.slice(indexOfFirstRecord, indexOfLastRecord);
    nPages = Math.ceil(blogs.length / recordsPerPage);
  } else {
    currentRecords = [];
    nPages = [];
  }

  let blogContent;

  if (windowWidth > 761) {
    blogContent = currentRecords.map((blog) => {
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
              <p className="excerpt">{blog.description}</p>
              <NavLink to={`/blogs/${blog.title}`} className="read-more-btn">
                read more <i className="fas fa-angle-right"></i>
              </NavLink>
            </div>
          </div>
        </div>
      );
    });
  } else {
    blogContent = blogs.map((blog) => {
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
              <p className="excerpt">{blog.content}</p>
              <NavLink to={`/blogs/${blog.title}`} className="read-more-btn">
                read more <i className="fas fa-angle-right"></i>
              </NavLink>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="latest-news mt-150 mb-150 mt-5">
      <div className="container">
        <div className="row">
          {loadingPage && <Loader />}
          <div className="col-12 text-center">
            {isLoading && <MiniLoader />}
            {errorMessage && (
              <>
                <div class="alert alert-danger text-center" role="alert">
                  {errorMessage.error}
                </div>
                <a className="btn btn-warning" href="/blogs">
                  Reload Page
                </a>
              </>
            )}
          </div>
          {!isLoading && blogContent.length > 0 && blogContent}
        </div>
        {windowWidth > 761 && nPages > 0 && (
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
