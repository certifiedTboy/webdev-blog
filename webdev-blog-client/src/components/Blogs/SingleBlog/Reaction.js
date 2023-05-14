import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getBlogById } from "../../../lib/APIs/BlogAPIs/BlogAPI";
import { reactToBlog } from "../../../lib/APIs/BlogAPIs/BlogAPI";

const Reaction = ({ reaction, blogId }) => {
  const [reactions, setReactions] = useState([]);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [id, setId] = useState("");

  const { user } = useSelector((state) => state.login);

  useEffect(() => {
    if (blogId) {
      setId(blogId);
    }
  }, []);

  const onReactToBlog = async (event) => {
    setRequestSuccess(false);
    const response = await reactToBlog(event.target.value, id);
    if (!response.error) {
      return setRequestSuccess(true);
    } else {
      return setRequestSuccess(false);
    }
  };

  useEffect(() => {
    const onGetBlogById = async () => {
      const response = await getBlogById(id);

      if (!response.error) {
        return setReactions(response.data.reactions);
      }
    };
    onGetBlogById();
  }, [id, requestSuccess]);

  return (
    <div>
      {user && (
        <button
          type="submit"
          class="btn-primary position-relative"
          value="like"
          onClick={onReactToBlog}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="white"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </span>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {reactions.length}
          </span>
        </button>
      )}
      {!user && (
        <button type="button" class="btn-primary position-relative" disabled>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              fill="white"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </span>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {reaction.length}
          </span>
        </button>
      )}
    </div>
  );
};

export default Reaction;
