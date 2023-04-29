import User from "../../models/user";
import VerificationData from "../../models/verificationData";
import VerificationUrl from "../../utils/auth/verificationUrl";
import {
  NotFoundError,
  ConflictError,
  UnprocessableError,
} from "../../lib/exceptions";

/**
 * @class VerificationHelper
 */
class VerificationHelper {
  /**
   * @method createVerificationData
   * @static
   * @async
   * @returns {VerificationData}
   */

  static async createVerificationData(email: string) {
    const dataToVerify = { email };

    await this.checkThatEmailDoesNotExist(email);
    const emailDataExist = await this.emailAvailableForVerification(email);
    if (emailDataExist) {
      const generatedUrl = VerificationUrl.generateUrl(
        emailDataExist._id.toString()
      );
      return generatedUrl;
    } else {
      const verificationData = new VerificationData(dataToVerify);
      await verificationData.save();
      if (verificationData) {
        const generatedUrl = VerificationUrl.generateUrl(
          verificationData._id.toString()
        );
        return generatedUrl;
      }
    }
  }

  /**
   * @method verifyEmail
   * @static
   * @async
   * @param {string} verificationId
   * @param {string} verificationToken
   * @return {Promise<VerificationData>}
   */

  static async verifyEmail(verificationId: string, verificationToken: string) {
    await this.checkVerificationDataIsValid(verificationId, verificationToken);
    await this.chechThatVerificationLinkIsExpired(verificationId);

    const dataToVerify = await this.fetchDataToVerify(verificationToken);
    if (dataToVerify) {
      const userData = {
        email: dataToVerify.email,
        username:
          dataToVerify.email?.split("@")[0] + "-" + dataToVerify._id.toString(),
        firstName: "",
        lastName: "",
        about: "",
      };
      const user = new User(userData);

      await user.save();
      if (user) {
        await VerificationData.findByIdAndRemove(verificationId);
        return user;
      }
    }
  }

  /**
   * @method checkThatEmailDoesNotExist
   * @static
   * @async
   * @param {string} email
   * @returns {Promise<void>}
   */
  private static async checkThatEmailDoesNotExist(
    email: string
  ): Promise<void> {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw new ConflictError("Email is already registered");
    }
  }

  /**
   * @method emailAvailableForVerification
   * @static
   * @async
   * @param {string} email
   * @returns {Promise<VerificationData>}
   */
  private static async emailAvailableForVerification(email: string) {
    const foundData = await VerificationData.findOne({ email });
    if (foundData) {
      return foundData;
    }
  }

  /**
   * @method checkVerificationDataIsValid
   * @static
   * @async
   * @param {string} verificationId
   * @returns {Promise<void>}
   */
  private static async checkVerificationDataIsValid(
    verificationId: string,
    verificationToken: string
  ): Promise<void> {
    const foundData = await VerificationData.findOne({ _id: verificationId });

    if (foundData?.verificationToken !== verificationToken) {
      throw new ConflictError("Invalid account verification link!");
    }
  }

  /**
   * @method chechThatVerificationLinkIsExpired
   * @static
   * @async
   * @param {string} verificationId
   * @returns {Promise<void>}
   */
  private static async chechThatVerificationLinkIsExpired(
    verificationId: string
  ): Promise<void> {
    const foundData = await VerificationData.findOne({ _id: verificationId });

    if (foundData) {
      const newDate: any = new Date();
      const expiryTime: any = foundData.expiresAt;
      const timeInMilleSeconds = Math.abs(expiryTime - newDate);
      const hours = timeInMilleSeconds / 36e5;

      console.log(hours);
      if (hours > 1) {
        await VerificationData.findByIdAndRemove(verificationId);
        throw new UnprocessableError("verification link is expired");
      }
    }
  }

  /**
   * @method fetchDataToVerify
   * @static
   * @async
   * @param {string} verificationId
   * @returns {Promise<VerificationData>}
   */
  private static async fetchDataToVerify(verificationToken: string) {
    const foundData = await VerificationData.findOne({ verificationToken });
    if (foundData) {
      return foundData;
    }
  }
}

export default VerificationHelper;
