import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../blogRedux/BlogActions";

const RelatedPosts = () => {
  const [recordsPerPage] = useState(6);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const indexOfLastRecord = 1 * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const { blogs } = useSelector((state) => state.blog);

  useEffect(() => {
    if (blogs.length > 0) {
      setRecentBlogs(blogs.slice(indexOfFirstRecord, indexOfLastRecord));
    }
  }, [blogs, indexOfFirstRecord, indexOfLastRecord]);

  return (
    <ul>
      {recentBlogs.map((blog) => {
        return (
          <li key={blog.id}>
            <a href="single-news.html">{blog.title}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default RelatedPosts;
