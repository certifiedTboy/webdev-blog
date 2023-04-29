import { Request, Response, NextFunction } from "express";
import { UnprocessableError } from "../../lib/exceptions";
import { BodyValidator, checkRequestValidations } from "../../lib/middlewares";
/**
 * @class AuthenticationValidator
 */
class AuthenticationValidator {
  /**
   * @method checkLoginWithEmail
   * @static
   * @returns {any[]}
   */
  static checkLoginWithEmail(): any[] {
    return [
      BodyValidator.checkNonEmptyString("email"),
      BodyValidator.checkNonEmptyString("password"),
      checkRequestValidations(),
    ];
  }

  /**
   * @method checkEmailValidity
   * @static
   * @returns {string}
   */
  static checkEmailValidity(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      const emailIsValid = email.includes("@");
      if (!emailIsValid) {
        throw new UnprocessableError("Incorrect password or email");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method checkPasscodeValidity
   * @static
   * @returns {string}
   */
  static async checkPasswordValidity(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { password } = req.body;
    try {
      const passcodeLengthIsValid = password.trim().length < 8;
      const valid = {
        hasUpper: /[A-Z]/,
        hasLower: /[a-z]/,
        hasNumber: /[0-9]/,
        hasSpclChr: /[@,#,$,%,&]/,
      };
      if (
        passcodeLengthIsValid ||
        !password.match(valid.hasUpper) ||
        !password.match(valid.hasLower) ||
        !password.match(valid.hasNumber) ||
        !password.match(valid.hasSpclChr)
      ) {
        throw new UnprocessableError("Incorrect password or email");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AuthenticationValidator;
