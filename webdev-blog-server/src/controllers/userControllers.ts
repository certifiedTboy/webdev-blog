import { Request, Response, NextFunction, Express } from "express";
import { ResponseHandler } from "../lib/helpers";
import { ICreateUser } from "../interfaces";
import UserHelper from "../helpers/userHelpers/userHelpers";
import EmailHelper from "../helpers/email/EmailHelper";

/**
 * @class UserController
 */
class UserController {
  /**
   * @method getAUserByUsername
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<User>}
   */
  static async getAUserByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { username } = req.params;

    try {
      const user = await UserHelper.checkThatUserExistByUsername(username);
      ResponseHandler.ok(res, user, "success");
    } catch (err) {
      next(err);
    }
  }
  /**
   * @method uploadProfile
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise <any>}
   */
  static async uploadProfile(req: any, res: Response, next: NextFunction):Promise<any> {
    const userId = req.user.id;
    const file = req.file as { [fieldname: string]: Express.Multer.File[] };

    const uploadedImagePath = "uploads/" + req.file.originalname + "-" + userId;

    try {
      const updatedUser = await UserHelper.profileUpload(
        userId,
        uploadedImagePath
      );
      ResponseHandler.ok(res, {}, "success");
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getProfilePicture
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<User>}
   */
  static async getProfilePicture(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.user.id;
    try {
      const profilePicture = await UserHelper.getUserProfilePicture(userId);
      ResponseHandler.ok(res, { profilePicture }, "success");
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method getOtherProfilePicture
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<User>}
   */
  static async getOtherProfilePicture(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { username } = req.params;
    try {
      const profilePicture = await UserHelper.getOtherUserProfilePicture(
        username
      );
      ResponseHandler.ok(res, { profilePicture }, "success");
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method updateAbout
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<User>}
   */
  static async updateUser(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.user.id;
    const { firstName, lastName, about } = req.body;
    try {
      const updatedUser = await UserHelper.updateUserData(
        userId,
        firstName,
        lastName,
        about
      );
      ResponseHandler.ok(res, {}, "success");
    } catch (err) {
      next(err);
    }
  }

  /**
   * @method followUser
   * @static
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<User>}
   */
  static async followUser(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const userId = req.user.id;
    const { username } = req.params;
    try {
      const followedUser = await UserHelper.updateUserFollower(
        userId,
        username
      );

      if (followedUser) {
        ResponseHandler.ok(res, followedUser, "success");
      }
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
