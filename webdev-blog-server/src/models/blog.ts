import mongoose from "mongoose";

const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
    user: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      username: String,
      firstName: String,
      lastName: String,
    },
    reactions: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
        name: String,
        reaction: String,
      },
    ],
    totalRead: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

export default Blog;
