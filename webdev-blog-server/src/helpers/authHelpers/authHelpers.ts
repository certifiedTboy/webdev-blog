const { OAuth2Client } = require("google-auth-library");
import SessionHelpers from "./sessionHelpers";
import UserHelper from "../userHelpers/userHelpers";
import DevicePlatformDetector from "../general/DevicePlatformDetector";
import PasswordHasher from "../../utils/auth/PasswordHasher";
import { UnauthenticatedError } from "../../lib/exceptions";

/**
 * @class AuthHelper
 */
class AuthHelper {
  /**
   * @method userLogin
   * @static
   * @async
   * @param {string} email
   * @param {string} password
   * @param {string} ipAddress
   * @param {string} userAgent
   * @returns {User}
   */
  static async userLogin(
    email: string,
    password: string,
    ipAddress: string,
    userAgent: string
  ) {
    const user = await UserHelper.checkThatEmailExistForLogin(email);
    if (!user.password) {
      //update password on first login
      const newPassword = await PasswordHasher.hash(password);
      user.password = newPassword;
      await user.save();

      const userSession = await SessionHelpers.createOrUpdatePlatformSession(
        user._id.toString(),
        DevicePlatformDetector.getMobileCategory(userAgent),
        ipAddress
      );
      const userData = {
        username: user.username,
        userType: user.userType,
      };
      return {
        userData,
        authToken: userSession.token,
      };
    } else {
      //compare password on subsequent login
      this.checkThatPasswordIsValid(password, user.password);
      const userSession = await SessionHelpers.createOrUpdatePlatformSession(
        user._id.toString(),
        DevicePlatformDetector.getMobileCategory(userAgent),
        ipAddress
      );
      const userData = {
        username: user.username,
        userType: user.userType,
      };
      return {
        userData,
        authToken: userSession.token,
      };
    }
  }

  /**
   * @method googleOauthLogin
   * @static
   * @async
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} profilePicture
   * @param {string} ipAddress
   * @param {string} userAgent
   * @returns {User}
   */

  static async googleOauthLogin(
    firstName: string,
    lastName:string,
    email: string,
    profilePicture: string,
    ipAddress: string,
    userAgent: string
  ) {

    
    const user = await UserHelper.checkThatUserExistByEmail(email);
    
    if (user) {
      await UserHelper.updateUser(user._id.toString(), profilePicture)
      const userSession = await SessionHelpers.createOrUpdatePlatformSession(
        user._id.toString(),
        DevicePlatformDetector.getMobileCategory(userAgent),
        ipAddress
      );
      const userData = {
        username: user.username,
        userType: user.userType,
      };
      return {
        userData,
        authToken: userSession.token,
      };
    }else{
      const newUser = await UserHelper.createUser(firstName, lastName, email, profilePicture)
      if(newUser){
        const userSession = await SessionHelpers.createOrUpdatePlatformSession(
          newUser._id.toString(),
          DevicePlatformDetector.getMobileCategory(userAgent),
          ipAddress
        );
        const userData = {
          username: newUser.username,
          userType: newUser.userType,
        };
        return {
          userData,
          authToken: userSession.token,
        };
      }
    }
  }

  /**
   * @method checkThatPasswordIsValid
   * @static
   * @param {string} plainTextPasword
   * @param {string} hashedPassword
   */
  static checkThatPasswordIsValid(
    plainTextPasword: string,
    hashedPassword: string
  ): void {
    if (!PasswordHasher.verify(plainTextPasword, hashedPassword)) {
      throw new UnauthenticatedError("email or password is incorrect");
    }
  }
}

export default AuthHelper;
