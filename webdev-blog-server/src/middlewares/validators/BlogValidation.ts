import { Request, Response, NextFunction } from "express";
import UserHelper from "../../helpers/userHelpers/userHelpers";
import { UnprocessableError } from "../../lib/exceptions";

/**
 * @class BlogValidator
 */
class BlogValidator {
  /**
   * @method checkDataValidity
   * @static
   * @param {string} title
   * @param {string} description
   * @param {string} category
   * @returns {void}
   */
  static async checkDataValidity(req: any, res: Response, next: NextFunction):Promise<void> {
    const { title, description, category } = req.body;
    try {
      if (req.user) {
        if (title.trim().length > 50 || description.trim().length > 150) {
          throw new UnprocessableError(
            "Title or Description cannot be longer than 50 and 150 characters respectively"
          );
        } else {
          next();
        }
      }
    } catch (error) {
      next(error);
    }
  }

   /**
   * @method checkUserName
   * @static
   * @param {string} userId
   * @returns {void}
   */
    static async checkUserName(req: any, res: Response, next: NextFunction):Promise <void> {
      try {
        if(req.user){
          const user = await UserHelper.checkThatUserExistById(req.user.id)

          if(!user?.firstName || !user?.lastName){

            throw new UnprocessableError("update your account name")

          }

          next()
        }
      } catch (error) {
        next(error);
      }
    }
}

export default BlogValidator;
