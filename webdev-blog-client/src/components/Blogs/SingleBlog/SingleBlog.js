import React, { Fragment } from "react";
import { Interweave } from "interweave";
import Moment from "react-moment";
import RelatedPosts from "./RelatedPosts";
import KeyWords from "./KeyWords";
import "./SingleBlog.css";
import { NavLink } from "react-router-dom";
import { transform } from "./Transform";

const SingleBlog = ({ blog, errorMessage }) => {
  return (
    <div className="mt-150 mb-150 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="single-article-section">
              <div className="single-article-text">
                {/* <div className="single-artcile-bg"></div> */}

                <h2>{blog.title}</h2>
                <p className="blog-meta">
                  {blog.user && (
                    <span className="author">
                      <i className="fas fa-user"></i>
                      <NavLink to={`/w-d/${blog.user.username}`}>
                        {" "}
                        {blog.user.firstName} {blog.user.lastName}
                      </NavLink>
                    </span>
                  )}
                  <span className="date">
                    <i className="fas fa-calendar"></i>{" "}
                    <Moment className="meta-own" fromNow>
                      {blog.createdAt}
                    </Moment>
                  </span>
                </p>

                {blog.content && (
                  <Fragment>
                    <Interweave content={blog.content} transform={transform} />
                  </Fragment>
                )}
              </div>

              {/* <div className="comments-list-wrap">
                <h3 className="comment-count-title">3 Comments</h3>
                <div className="comment-list">
                  <div className="single-comment-body">
                    <div className="comment-user-avater">
                      <img src="" alt="" />
                    </div>
                    <div className="comment-text-body">
                      <h4>
                        Jenny Joe{" "}
                        <span className="comment-date">Aprl 26, 2020</span>{" "}
                        <a href="#">reply</a>
                      </h4>
                      <p>
                        Nunc risus ex, tempus quis purus ac, tempor consequat
                        ex. Vivamus sem magna, maximus at est id, maximus
                        aliquet nunc. Suspendisse lacinia velit a eros
                        porttitor, in interdum ante faucibus Suspendisse lacinia
                        velit a eros porttitor, in interdum ante faucibus.
                      </p>
                    </div>
                    <div className="single-comment-body child">
                      <div className="comment-user-avater">
                        <img src="" alt="" />
                      </div>
                      <div className="comment-text-body">
                        <h4>
                          Simon Soe{" "}
                          <span className="comment-date">Aprl 27, 2020</span>{" "}
                          <a href="#">reply</a>
                        </h4>
                        <p>
                          Nunc risus ex, tempus quis purus ac, tempor consequat
                          ex. Vivamus sem magna, maximus at est id, maximus
                          aliquet nunc. Suspendisse lacinia velit a eros
                          porttitor, in interdum ante faucibus.
                        </p>
                      </div>
                    </div>
                  </div> */}
              {/* <div className="single-comment-body">
                    <div className="comment-user-avater">
                      <img src="" alt="" />
                    </div>
                    <div className="comment-text-body">
                      <h4>
                        Addy Aoe{" "}
                        <span className="comment-date">May 12, 2020</span>{" "}
                        <a href="#">reply</a>
                      </h4>
                      <p>
                        Nunc risus ex, tempus quis purus ac, tempor consequat
                        ex. Vivamus sem magna, maximus at est id, maximus
                        aliquet nunc. Suspendisse lacinia velit a eros
                        porttitor, in interdum ante faucibus Suspendisse lacinia
                        velit a eros porttitor, in interdum ante faucibus.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="comment-template">
                <h4>Leave a comment</h4>
                <p>
                  If you have a comment dont feel hesitate to send us your
                  opinion.
                </p>
                <form>
                  <p>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                  </p>
                  <p>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="10"
                      placeholder="Your Message"
                    ></textarea>
                  </p>
                  <p>
                    <input type="submit" value="Submit" />
                  </p>
                </form>
              </div> */}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="sidebar-section">
              <div className="recent-posts">
                <h4>Recent Posts</h4>
                <RelatedPosts />
              </div>

              <div className="tag-section">
                <h4>Keywords</h4>
                <KeyWords />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
