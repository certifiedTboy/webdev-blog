import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../lib/exceptions";
import AuthHelper from "../helpers/authHelpers/authHelpers";
import GoogleOauth from "../utils/auth/googleOauth";
import { ResponseHandler } from "../lib/helpers";

/**
 * @class AuthController
 */

class AuthController {
  /**
   *
   * @method emailLogin
   * @static
   * @async
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @returns {User}
   */

  static async emailLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { email, password } = req.body;
      const userWithToken = await AuthHelper.userLogin(
        email,
        password,
        req.ip,
        req.headers["user-agent"] || ""
      );
      ResponseHandler.ok(res, userWithToken, "Logged-in successfully!");
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @method googleOauthHandler
   * @static
   * @async
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @returns {User}
   */

  static async googleOauthHandler(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {

      const decodedToken = decodeURIComponent(req.params.token)

     const {given_name, family_name, email, picture} = await GoogleOauth.verifyToken(decodedToken)
     if(given_name || family_name){
      const userData = await AuthHelper.googleOauthLogin(
        family_name,
        given_name, 
        email, 
        picture,
        req.ip,
        req.headers["user-agent"] || ""
      );

      if (userData) {
      ResponseHandler.ok(res, userData, "login success");
      }
     }
     
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
