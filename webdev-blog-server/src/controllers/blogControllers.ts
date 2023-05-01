import { Request, Response, NextFunction } from "express";
import BlogHelpers from "../helpers/blogHelpers/blogHelpers";
import { ResponseHandler } from "../lib/helpers";

/**
 * @class BlogControllers
 */
class BlogControllers {
  /**
   * @method createNewBlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {ICreateBlog}
   */
  static async createNewBlog(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.user.id;
    const { title, description, content } = req.body;

    try {
      const blog = await BlogHelpers.createBlog(
        userId,
        title,
        description,
        content
      );

      if (blog) {
        ResponseHandler.created(res, blog, "blog created success");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method updateBlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {ICreateBlog}
   */
  static async updateBlog(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.user.id;
    const { blogId } = req.params;
    const { title, description, content } = req.body;

    try {
      const blog = await BlogHelpers.updateBlogById(
        userId,
        blogId,
        title,
        description,
        content
      );

      if (blog) {
        ResponseHandler.created(res, blog, "blog created success");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getABlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {ICreateBlog}
   */
  static async getABlog(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { title } = req.params;
    try {
      const blog = await BlogHelpers.getBlogByTitle(title);

      if (blog) {
        ResponseHandler.created(res, blog, "success");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getBlogById
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {ICreateBlog}
   */
  static async getBlogById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { blogId } = req.params;
    try {
      const blog = await BlogHelpers.checkThatBlogExistById(blogId);

      if (blog) {
        ResponseHandler.created(res, blog, "success");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getAllBlogs
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {ICreateBlog}
   */
  static async getAllBlogs(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const blogs = await BlogHelpers.getAllBlogs();
      if (blogs) {
        ResponseHandler.created(res, blogs, "success");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method reactToBlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {ICreateBlog}
   */
  static async reactToBlog(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.user.id;
    const { blogId } = req.params;
    const { reaction } = req.body;
    try {
      const reactionToBlog = await BlogHelpers.updateReactionToBlog(
        userId,
        blogId,
        reaction
      );

      if (reactionToBlog) {
        ResponseHandler.ok(res, reactionToBlog, "success");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method publishBlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {ICreateBlog}
   */
  static async publishBlog(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { blogId } = req.params;
    try {
      const publishedBlog = await BlogHelpers.updatePublishState(blogId);

      if (publishedBlog) {
        ResponseHandler.ok(res, publishedBlog, "success");
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method deleteBlog
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {void}
   */
  static async deleteBlog(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { blogId } = req.params;
    try {
      const publishedBlog = await BlogHelpers.removeBlog(blogId);

      if (publishedBlog) {
        ResponseHandler.ok(res, {}, "success");
      }
    } catch (err) {
      next(err);
    }
  }
}

export default BlogControllers;
