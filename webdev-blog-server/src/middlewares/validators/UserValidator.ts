import { Request, Response, NextFunction } from "express";
import { UnprocessableError } from "../../lib/exceptions";

/**
 * @class UserValidator
 */
class UserValidator {
  /**
   * @method checkUpdateDataIsValid
   * @static
   * @returns {string}
   */
   static async checkUpdateDataIsValid(req: any, res: Response, next: NextFunction) {
    const { firstName, lastName, about } = req.body;
    try {
      if (req.user) {
        if (firstName.trim().length > 20 || lastName.trim().length > 20) {
          throw new UnprocessableError(
            "Firstname or Lastname cannot be longer than 20"
          );
        } else if (about.length > 1000) {
          throw new UnprocessableError(
            "about cannot exceed morethan 1000 characters"
          );
        } else {
          next();
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default UserValidator;
