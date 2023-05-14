import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getBlogsByUser } from "../../../lib/generaRequestRedux/BlogActions";

const RelatedPosts = ({ username }) => {
  const [recordsPerPage] = useState(6);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const params = useParams();
  const { title } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(getBlogsByUser(username));
    }
  }, []);

  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    const publishedBlogsByUser = blogs.filter((blog) => blog.isPublished);
    const blogByUser = publishedBlogsByUser.filter(
      (newBlog) => newBlog.title !== title
    );

    if (blogByUser.length > 0) {
      setRecentBlogs(blogByUser.slice(indexOfFirstRecord, indexOfLastRecord));
    }
  }, [blogs, indexOfFirstRecord, indexOfLastRecord, username, title]);

  return (
    <ul>
      {recentBlogs.map((blog) => {
        return (
          <li key={blog._id}>
            <NavLink to={`/blogs/${blog.title}`}>{blog.title}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default RelatedPosts;
