import { getAllBlogs } from "../../lib/APIs/BlogAPIs/BlogAPI";

const blogs = [];

const onGetAllBlogs = async () => {
  const response = await getAllBlogs();
  response.data.map((blg) => {
    let newData = {
      text: blg.title,
      value: blg.title,
      url: "http://localhost:3000/api/v1/blogs/" + blg._id,
    };

    return blogs.push(newData);
  });
};

onGetAllBlogs();

export const toolbar = {
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
};

export const mention = {
  separator: " ",
  trigger: "@",
  suggestions: blogs,
};

export const hashtag = {
  separator: " ",
  trigger: "#",
};
