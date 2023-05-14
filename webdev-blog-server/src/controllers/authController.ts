import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../lib/exceptions";
import AuthHelper from "../helpers/authHelpers/authHelpers";
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

static async emailLogin(req:Request, res:Response, next:NextFunction):Promise<any> {
  try {
    const { email, password } = req.body;
    const userWithToken = await AuthHelper.userLogin(
        email, 
        password,
        req.ip,
        req.headers["user-agent"] || ""
    );
    ResponseHandler.ok(res, userWithToken, "Logged-in successfully!");
} catch(err) {
    next(err);
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

static async googleOauthHandler(req:Request, res:Response, next:NextFunction):Promise<any> {
  try{
    const code = req.query.code as string;
    const pathUrl = (req.query.state as string) || '/';

    if (!code) {
      throw new UnauthorizedError('Authorization code not provided!');
    }
    const user = await AuthHelper.googleOauthLogin(code)
    if (!user){
      return res.redirect(`/oauth/error`);
    }
  }catch(error){

  }
}

}


export default AuthController