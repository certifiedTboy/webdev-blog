import React, { useState } from "react";
import "./PostBuilder.css";

const Category = ({
  getCategory,
  title: savedTitle,
  description: savedDescription,
  category: savedCategory,
}) => {
  const [category, setCategory] = useState(savedCategory);
  const [title, setTitle] = useState(savedTitle);
  const [description, setDescription] = useState(savedDescription);

  getCategory(category, title, description);

  return (
    <div>
      <div className="form-group select-container">
        <select
          onChange={(event) => setCategory(event.target.value)}
          value={category}
          className="form-control"
        >
          <option value="Javascript">Javascript</option>
          <option value="HTML">HTML</option>
          <option value="Node Js">Node Js</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div className="form-group title-container">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          className="form-control"
        />
      </div>
    </div>
  );
};

export default Category;
