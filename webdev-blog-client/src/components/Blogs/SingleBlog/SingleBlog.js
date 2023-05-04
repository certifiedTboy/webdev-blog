import React, { useState, Fragment, useEffect } from "react";
import { Interweave } from "interweave";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { NavLink } from "react-router-dom";
import { onFollowUser } from "../../../lib/generaRequestRedux/FollowActions";
import { getUserByUsername } from "../../../lib/APIs/UserApi/userApi";
import { transform } from "./Transform";
import RelatedPosts from "./RelatedPosts";
import KeyWords from "./KeyWords";
import "./SingleBlog.css";

const SingleBlog = ({ blog }) => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [userIsFollowing, setUserIsFollowing] = useState(false);
  const [blogOwner, setBlogOwner] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    if (blog.user) {
      setBlogOwner(blog.user.username);
    }
  }, [blog.user]);

  const followUserHandler = async () => {
    await dispatch(onFollowUser(blog.user.username));
  };

  const { follow_loading, follow_success, follow_failed } = useSelector(
    (state) => state.follow
  );

  useEffect(() => {
    const onGetUserByUsername = async () => {
      const response = await getUserByUsername(blogOwner);
      if (!response.error) {
        setFollowers(response.data.followers);
        return setFollowing(response.data.following);
      }
    };

    onGetUserByUsername();
  }, [blogOwner, follow_success, follow_failed]);

  useEffect(() => {
    const userFollow = followers.find(
      (follow) => follow.username === user.username
    );

    if (userFollow) {
      return setUserIsFollowing(true);
    } else {
      return setUserIsFollowing(false);
    }
  }, [followers]);

  return (
    <div className="mt-150 mb-150 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="single-article-section">
              <div className="single-article-text">
                <h2>{blog.title}</h2>
                <p className="blog-meta d-inline mr-2">
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
                <div className="mb-4">
                  <button type="button" class="btn-primary mr-2">
                    following{" "}
                    <span className={`badge text-bg-secondary`}>
                      {following.length}
                    </span>
                  </button>

                  <button type="button" class="btn-primary">
                    followers{" "}
                    <span className="badge text-bg-secondary">
                      {followers.length}
                    </span>
                  </button>

                  {user && blogOwner !== user.username && (
                    <button
                      type="submit"
                      className="btn-success d-inline ml-2"
                      onClick={followUserHandler}
                    >
                      {userIsFollowing ? "unfollow" : "follow"}
                    </button>
                  )}
                </div>

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
                {blog.user && <RelatedPosts username={blog.user.username} />}
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
