import React, { Fragment, useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { createBlog, getBlogById } from "../../lib/APIs/BlogAPIs/BlogAPI";
import { toolbar, hashtag, mention } from "./Options";
import PreviewModal from "./PreviewModal";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./PostBuilder.css";
import Category from "./Category";

const PostBuilder = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const contentRef = useRef();
  const [description, setDescription] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const params = useParams();
  const navigate = useNavigate();

  const { blogId } = params;

  useEffect(() => {
    const onGetBlogById = async () => {
      try {
        const response = await getBlogById(blogId);
        console.log(response);
        if (response.error) {
          return;
        }

        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        contentRef(response.data.content);
      } catch (error) {
        return { error: "something went wrong" };
      }
    };
    onGetBlogById();
  }, [blogId]);

  const onShowModal = () => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  };

  const getCategory = (category, title, description) => {
    setCategory(category);
    setTitle(title);
    setDescription(description);
  };

  const saveBlogAs = async () => {
    const blogData = {
      title,
      category,
      description,
      content: contentRef.current.value,
    };
    setIsLoading(true);
    try {
      const response = await createBlog(blogData);
      if (response.error) {
        setIsLoading(false);
        return setErrorMessage(response.error);
      }

      setIsSaved(true);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("something went wrong");
    }
  };

  return (
    <Fragment>
      {showModal && (
        <PreviewModal
          title={title}
          content={contentRef.current.value}
          onShowModal={onShowModal}
        />
      )}

      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <header className="App-header">Write Article</header>

            <div className="mb-3">
              <p className="d-inline">
                <strong> Article preview </strong>
              </p>
              <button
                type="submit"
                className={`ml-2 d-inline float-right ${
                  isSaved ? "btn-warning" : "btn-danger"
                }`}
                onClick={saveBlogAs}
              >
                {isLoading ? "Please wait" : "Save"}
              </button>
              <button
                type="submit"
                className="d-inline float-right"
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
            <Category
              getCategory={getCategory}
              title={title}
              description={description}
              category={category}
            />
            <textarea
              className="text-output"
              disabled
              ref={contentRef}
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />
            {/* <pre>
              {draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            </pre> */}

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
          <div className="col-2"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default PostBuilder;
