import { Request, Response, NextFunction } from "express";
import BlogHelpers from "../../helpers/blogHelpers/blogHelpers";
import { UnauthorizedError, UnprocessableError } from "../../lib/exceptions";

/**
 * @class BlogAuthorization
 */
class BlogAuthorization {
  /**
   * @method checkBlogOWnership
   * @static
   * @returns {string}
   */
  static async checkBlogOwnership(req: any, res: Response, next: NextFunction) {
    const userId = req.user.id;
    const { blogId } = req.params;
    try {
      const blog = await BlogHelpers.checkThatBlogExistById(blogId);
      if (blog.user.userId.toString() !== userId) {
        throw new UnauthorizedError(
          "you do not have permission to carry out this action"
        );
      } 

      next()
    } catch (error) {
      next(error);
    }
  }
}

export default BlogAuthorization;
