import User from "../../models/user";
import JwtHelper from "../../utils/auth/JWT";
import SessionHelpers from "./sessionHelpers";
import UserHelper from "../userHelpers/userHelpers";
import { getGoogleOauthToken, getGoogleUser } from "../../utils/auth/session";
import DevicePlatformDetector from "../general/DevicePlatformDetector";
import PasswordHasher from "../../utils/auth/PasswordHasher";
import { UnauthorizedError, UnauthenticatedError } from "../../lib/exceptions";

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
      const newPassword = await PasswordHasher.hash(password)
      user.password = newPassword
      await user.save()

      const userSession = await SessionHelpers.createOrUpdatePlatformSession(
        user._id.toString(),
        DevicePlatformDetector.getMobileCategory(userAgent),
        ipAddress
      );
      const userData = {
        username: user.username, 
        userType: user.userType
      }
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
        userType: user.userType
      }
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
   * @param {string} string
   * @returns {User}
   */

  static async googleOauthLogin(code: string): Promise<object> {
    // Use the code to get the id and access tokens
    const { id_token, access_token } = await getGoogleOauthToken({ code });

    // Use the token to get the User
    const { name, verified_email, email, picture } = await getGoogleUser({
      id_token,
      access_token,
    });

    // Check if user is verified
    if (!verified_email) {
      throw new UnauthorizedError("Google account not verified");
    }

    // Update user if user already exist or create new user
    const user = await User.findOne({ email: email });

    const updatedUser = await User.findByIdAndUpdate(
      user?._id,
      {
        name,
        photo: picture,
        email,
        provider: "Google",
        verified: true,
      },
      { upsert: true, runValidators: false, new: true, lean: true }
    );

    // Create access and refresh token
    const AUTH_TOKEN_TTL_IN_HOURS = "24h";
    await JwtHelper.generateToken(updatedUser, AUTH_TOKEN_TTL_IN_HOURS);

    return updatedUser;
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
