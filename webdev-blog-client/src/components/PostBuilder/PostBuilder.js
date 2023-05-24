import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  createBlog,
  getBlogById,
  checkBlogAlreadyCreated,
  updateBlog,
  publishBlog,
} from "../../lib/APIs/BlogAPIs/BlogAPI";
import {getUserByUsername} from "../../lib/APIs/UserApi/userApi"
import { toolbar, hashtag, mention } from "./Options";
import PreviewModal from "./PreviewModal";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./PostBuilder.css";

const PostBuilder = () => {
  const [userFirstname, setUserFirstname] = useState()
  const [userLastname, setUserLastname] = useState()
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState({ state: false, type: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [createdBlogId, setCreatedBlogId] = useState("");
  const contentRef = useRef("");
  const [blogExist, setBlogExist] = useState(false);
  const [description, setDescription] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const params = useParams();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.login)

  const { blogId } = params;

 
  useEffect(() => {
    const getCurrentUserData = async() => {
      const response = await getUserByUsername(user.username)
      if(response.message) {
        setUserFirstname(response.data.firstName)
        return setUserLastname(response.data.lastName)
      }
    }

    getCurrentUserData()
  }, [user])


 

  //blog input handlers
  const titleChangeHandler = (event) => {
    setErrorMessage("");
    setIsSaved(false);
    setTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setErrorMessage("");
    setIsSaved(false);
    setDescription(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setErrorMessage("");
    setIsSaved(false);
    setCategory(event.target.value);
  };

  //Toggle preview modal
  const onShowModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  // Check blog existence for edit
  useEffect(() => {
    const onGetBlogById = async () => {
      try {
        const response = await getBlogById(blogId);
        // if blog does not exist
        // navigate to create fresh article
        if (response.error) {
          return navigate("/write-article");
        }

        // update article state with existing blog data
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        response.data.isPublished
          ? setIsPublished(true)
          : setIsPublished(false);
        const contentBlock = htmlToDraft(response.data.content);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        setEditorState(() => EditorState.createWithContent(contentState));
      } catch (error) {
        return { error: "something went wrong" };
      }
    };
    onGetBlogById();
  }, [blogId]);

  // Create blog handler
  const saveBlogAs = async (event) => {

    if(!userFirstname || !userLastname){
      return setErrorMessage("Update name in profile before creating blog")
    }

    if (
      title.value.trim().length > 50 ||
      
      description.value.trim().length > 150
    ) {
      return setErrorMessage("Title or Description cannot be longer than 50 and 150 characters respectively");
    }

    if (
      title.value === "" ||
      !category ||
      description.value === "" ||
      contentRef.current.value === ""
    ) {
      return setErrorMessage("Blog inputs can't be empty");
    }

    const blogData = {
      title,
      category,
      description,
      content: contentRef.current.value,
    };
    setIsLoading({ state: true, type: "SAVE_AS" });
    try {
      const response = await createBlog(blogData);
      if (response.error) {
        setIsLoading(false);
        return setErrorMessage(response.error);
      }

      setIsLoading({ state: false, type: "" });
      setErrorMessage("");
      setIsSaved(true);
    } catch (error) {
      setIsLoading({ state: false, type: "" });
      setErrorMessage("something went wrong");
    }
  };

  // Update blog handler
  const saveBlog = async () => {
    if (
      title.value === "" ||
      !category ||
      description.value === "" ||
      contentRef.current.value === ""
    ) {
      return setErrorMessage("Blog inputs can't be empty");
    }
    const blogData = {
      title,
      category,
      description,
      content: contentRef.current.value,
    };
    setIsLoading({ state: true, type: "SAVE" });
    try {
      const response = await updateBlog(blogData, createdBlogId);
      if (response.error) {
        setIsLoading(false);
        return setErrorMessage(response.error);
      }

      setIsSaved(true);
      setIsLoading({ state: false, type: "" });
      setErrorMessage("");
    } catch (error) {
      setIsLoading({ state: false, type: "" });
      setErrorMessage("something went wrong");
    }
  };

  //publish created blog
  const onPublishBlog = async () => {
    try {
      setIsLoading({ state: true, type: "PUBLISH" });
      const response = await publishBlog(createdBlogId);
      if (response.error) {
        setIsLoading({ state: false, type: "" });
        return setErrorMessage(response.error);
      }

      setIsLoading({ state: false, type: "" });
      return setIsPublished(true);
    } catch (error) {
      setIsLoading({ state: false, type: "" });
    }
  };

  // check if blog is created for update
  useEffect(() => {
    const onGetBlogByTitle = async () => {
      const response = await checkBlogAlreadyCreated(
        title.trim().length > 1 ? title : "null"
      );
      if (!response.error) {
        setCreatedBlogId(response.data._id.toString());
        response.data.isPublished
          ? setIsPublished(true)
          : setIsPublished(false);
        return setBlogExist(true);
      }
    };

    const identifier = setTimeout(() => {
      onGetBlogByTitle();
    }, 3000);
    return () => {
      clearTimeout(identifier);
    };
  }, [saveBlogAs]);

  return (
    <Fragment>
      {showModal && (
        <PreviewModal
          title={title}
          content={contentRef.current.value}
          description={description}
          onShowModal={onShowModal}
        />
      )}

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-2 col-sm-1 col-12"></div>
          <div className="col-md-8 col-12 col-sm-10">
            <header className="App-header">Write Article</header>
            {errorMessage && (
              <div class="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="mb-3">
              <p className="d-inline preview-text">
                <strong> Article preview </strong>
              </p>
              {blogExist && (
                <button
                  onClick={onPublishBlog}
                  type="submit"
                  className={`ml-2 d-inline publish-btn float-right ${
                    isPublished ? "btn-success" : "btn-secondary"
                  }`}
                >
                  {isPublished ? "Unpublish" : "Publish"}
                </button>
              )}
              {blogExist && (
                <button
                  type="submit"
                  className={`ml-2 d-inline float-right save-btn ${
                    isSaved ? "btn-warning" : "btn-danger"
                  }`}
                  onClick={saveBlog}
                >
                  {isSaved ? "Saved" : "Save"}
                  <svg
                    className="ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-folder-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                    <path d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                </button>
              )}
              {!blogExist && (
                <button
                  type="submit"
                  className={`ml-2 d-inline float-right saveas-btn ${
                    isSaved ? "btn-warning" : "btn-danger"
                  }`}
                  onClick={saveBlogAs}
                >
                  {isLoading.type === "SAVE_AS" ? "please wait" : "Create Blog"}
                  <svg
                    className="ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-folder-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                    <path d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                </button>
              )}

              <button
                type="submit"
                className="d-inline float-right preview-btn"
                onClick={onShowModal}
              >
                Preview
                <svg
                  className="ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-zoom-in"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                  />
                  <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                  <path
                    fill-rule="evenodd"
                    d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <div className="form-group select-container">
                <select
                  onChange={categoryChangeHandler}
                  className="form-control"
                >
                  <option>Select Category</option>
                  <option value="Javascript">Javascript</option>
                  <option value="HTML">HTML</option>
                  <option value="Node Js">Node Js</option>
                  <option value="Python">Python</option>
                </select>
              </div>
              <div className="form-group title-container">
                <input
                  value={title}
                  onChange={titleChangeHandler}
                  placeholder="Title"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  value={description}
                  onChange={descriptionChangeHandler}
                  placeholder="Description"
                  className="form-control"
                />
              </div>
            </div>
            <textarea
              className="text-output"
              disabled
              ref={contentRef}
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />

            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
              toolbar={toolbar}
              mention={mention}
              hashtag={hashtag}
            />
          </div>
          <div className="col-md-2 col-sm-1 col-12"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostBuilder;
