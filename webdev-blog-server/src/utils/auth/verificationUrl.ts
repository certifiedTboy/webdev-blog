import config from "../../config/config";
import DateTimeCalculator from "../../helpers/general/DateTimeCalculator";
import RandomCodeGenerator from "../../helpers/general/RandomCodeGenerator";
import { ConflictError, NotFoundError } from "../../lib/exceptions";
import VerificationData from "../../models/verificationData";


/**
 * @class
 */
class VerificationUrl {

    /**
     * @method generateUrl
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<string>}
     */
    static async generateUrl(verificationId: string): Promise<string> {
        const TOKEN_SEPERATOR = ":";

        const verificationData = await this.generateToken(verificationId);
        const verificationToken = `${verificationData?.verificationToken}${TOKEN_SEPERATOR}${verificationId}`;

        const encodedVerificationToken: string = Buffer.from(verificationToken)
            .toString("base64");

        return `${config.FRONT_END_URL}/auth/account/verify/${encodedVerificationToken}`;
    }


    /**
     * @method generateToken
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<PasswordResetToken>}
     */
    private static async generateToken(verificationId: string) {
        const verificationData = await this.getDataById(verificationId)
        
        if(verificationData){
            verificationData.verificationToken = RandomCodeGenerator.get(60);
            verificationData.expiresAt = DateTimeCalculator.getDateTimeInNext(
            config.PASSWORD_RESET_TOKEN_TTL_IN_HOURS
        );

        await verificationData.save();

        return verificationData
        }

        
    }

    /**
     * @method getByUserId
     * @static
     * @async
     * @param {string} userId 
     * @returns {Promise<PasswordResetToken|null>}
     */
    private static async getDataById(verificationId: string) {
         const verificationData = await VerificationData.findOne({ _id:  verificationId  });
         return verificationData
    }

  

}

export default VerificationUrl;