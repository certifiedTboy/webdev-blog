import Blog from "../../models/blog";
import UserHelper from "../userHelpers/userHelpers";
import { ICreateBlog } from "../../interfaces/ICreateBlog";
import {
  NotFoundError,
  ServerError,
  UnprocessableError,
} from "../../lib/exceptions";

/**
 * @class BlogHelper
 */
class BlogHelpers {
  /**
   * @method createBlog
   * @static
   * @param {string} userId
   * @param {string} blogContent
   * @returns {Promise<Blog>}
   */
  static async createBlog(
    userId: string,
    title: string,
    description: string,
    content: string
  ): Promise<any> {
    try {
      const user = await UserHelper.checkThatUserExistById(userId);
      if (user) {
        const blogData = {
          title,
          description,
          content,
          user: {
            userId: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        };

        const createdBlog = new Blog(blogData);
        await createdBlog.save();
        if (!createdBlog) {
          throw new UnprocessableError("something went wrong");
        }

        return createdBlog;
      }
    } catch (error) {
      throw new ServerError("something went wrong");
    }
  }

  /**
   * @method updateBlogById
   * @static
   * @param {string} userId
   * @param {string} blogId
   * @param {string} title
   * @param {string} description
   * @param {string} content
   * @returns {Promise<Blog>}
   */
  static async updateBlogById(
    userId: string,
    blogId: string,
    title: string,
    description: string,
    content: string
  ): Promise<any> {
    try {
      const user = await UserHelper.checkThatUserExistById(userId);
      if (user) {
        const blogData = {
          title,
          description,
          content,
          user: {
            userId: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        };

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogData);
        if (!updatedBlog) {
          throw new UnprocessableError("something went wrong");
        }

        return updatedBlog;
      }
    } catch (error) {
      throw new ServerError("something went wrong");
    }
  }

  /**
   * @method updatePublishState
   * @static
   * @param {string} blogId
   * @returns {Promise<Blog>}
   */
  static async updatePublishState(blogId: string): Promise<any> {
    try {
      const blog = await this.checkThatBlogExistById(blogId);
      if (!blog.isPublished) {
        blog.isPublished = true;
        await blog.save();
        return blog;
      } else {
        blog.isPublished = false;
        await blog.save();
        return blog;
      }
    } catch (error) {
      throw new ServerError("something went wrong");
    }
  }

  /**
   * @method getBlogTitle
   * @static
   * @param {string} userId
   * @param {string} title
   * @returns {Promise<Blog>}
   */
  static async getBlogByTitle(title: string): Promise<any> {
    try {
      const foundBlog = await Blog.findOne({ title });
      if (!foundBlog) {
        throw new NotFoundError("blog not found");
      }
      return foundBlog;
    } catch (error) {
      throw new ServerError("something went wrong");
    }
  }

  /**
   * @method getAllBlogs
   * @static
   * @returns {Promise<Blog>}
   */
  static async getAllBlogs(): Promise<any> {
    try {
      const foundBlogs = await Blog.find({});

      if (!foundBlogs || foundBlogs.length === 0) {
        throw new NotFoundError("No blog found");
      }

      return foundBlogs;
    } catch (error) {
      throw new ServerError("something went wrong");
    }
  }

  /**
   * @method updateReactionToBlog
   * @static
   * @param {string} userId
   * @param {string} blogId
   * @param {string} reaction
   * @returns {Promise<Blog>}
   */
  static async updateReactionToBlog(
    userId: string,
    blogId: string,
    reaction: string
  ): Promise<any> {
    try {
      const user = await UserHelper.checkThatUserExistById(userId);
      const blog = await this.checkThatBlogExistById(blogId);

      const userAlreadyReactedToAbout =
        await this.checkThatUserAlreadyReactToBlog(blogId, userId);

      if (!userAlreadyReactedToAbout) {
        const reactionData = {
          userId: user?._id,
          username: user?.username,
          name: user?.firstName + " " + user?.lastName,
          reaction,
        };
        blog.reactions.push(reactionData);
        await blog.save();
        return blog;
      } else {
        const blogReactionIndex = blog.reactions.findIndex(
          (reaction: any) => reaction.userId === user?._id
        );
        blog.reactions.splice(blogReactionIndex, 1);

        await blog.save();
        return blog;
      }
    } catch (error) {
      throw new ServerError("something went wrong");
    }
  }

  /**
   * @method checkThatUserAlreadyReactToBlog
   * @static
   * @param {string} blogId
   * @returns {Promise<Blog>}
   */
  static async checkThatUserAlreadyReactToBlog(
    blogId: string,
    userId: string
  ): Promise<any> {
    const foundBlog = await this.checkThatBlogExistById(blogId);

    const userAlreadyReacted = foundBlog.reactions.find(
      (reaction: any) => reaction.userId.toString() === userId
    );

    return userAlreadyReacted;
  }

  /**
   * @method checkThatBlogExistById
   * @static
   * @param {string} blogId
   * @returns {Promise<Blog>}
   */
  static async checkThatBlogExistById(blogId: string): Promise<any> {
    const foundBlog = await Blog.findById(blogId);
    if (!foundBlog) {
      throw new NotFoundError("blog not found");
    }
    return foundBlog;
  }

  /**
   * @method removeBlog
   * @static
   * @param {string} blogId
   * @returns {Promise<void>}
   */
  static async removeBlog(blogId: string): Promise<any> {
    const removedBlog = await Blog.findByIdAndRemove(blogId);

    if (removedBlog) {
      return removedBlog;
    }
  }
}

export default BlogHelpers;
