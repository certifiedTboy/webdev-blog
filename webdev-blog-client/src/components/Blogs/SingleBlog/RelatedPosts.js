import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getBlogs } from "../blogRedux/BlogActions";

const RelatedPosts = ({ username }) => {
  const [recordsPerPage] = useState(6);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const params = useParams();
  const { title } = params;
  const dispatch = useDispatch();

  console.log(title);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    const allBlogsByUser = blogs.filter(
      (blog) => blog.user.username === username
    );
    const publishedBlogsByUser = allBlogsByUser.filter(
      (blog) => blog.isPublished
    );
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
          <li key={blog._id.toString()}>
            <NavLink to={`/blogs/${blog.title}`}>{blog.title}</NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default RelatedPosts;
