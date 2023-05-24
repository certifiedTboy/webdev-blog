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
   * @returns {string}
   */
  static async checkDataValidity(req: any, res: Response, next: NextFunction) {
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
   * @returns {string}
   */
    static async checkUserName(req: any, res: Response, next: NextFunction) {
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
