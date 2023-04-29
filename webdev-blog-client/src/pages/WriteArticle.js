import React from "react";
import PostBuilder from "../components/PostBuilder/PostBuilder";
import PostBuilderBanner from "../components/PostBuilder/PostBuilderBanner";
const WriteArticle = () => {
  return (
    <div>
      <PostBuilderBanner />
      <PostBuilder />;
    </div>
  );
};

export default WriteArticle;
