import User from "../../models/user"
import UserSession from "../../models/userSession";
import { DeviceMobileCategory } from "../../constants/device/DeviceMobileCategory";
import DateTimeCalculator  from "../../helpers/general/DateTimeCalculator";
import JwtHelper from "../../utils/auth/JWT";
import { IAuthPayload } from "../../interfaces";

/**
 * @class SessionHelpers
 */
class SessionHelpers {

    /**
     * @method createOrUpdatePlatformSession
     * @static
     * @async
     * @param {string} userId 
     * @param {DeviceMobileCategory} platform 
     * @param {string} ipAddress 
     * @returns {Promise<UserSession>}
     */
    static async createOrUpdatePlatformSession(
        userId: string, 
        platform: DeviceMobileCategory, 
        ipAddress: string
    ){
        let userSession = await this.getUserPlatformSession(userId, platform);

        const AUTH_TOKEN_TTL_IN_HOURS = 24;
        const AUTH_TOKEN = await this.getAuthToken(userId, AUTH_TOKEN_TTL_IN_HOURS);

        userSession.token = AUTH_TOKEN;
        userSession.ipAddress = ipAddress;

        userSession.expiresAt = DateTimeCalculator.getDateTimeInNext(
            AUTH_TOKEN_TTL_IN_HOURS
        );

        return userSession.save();
    }

    /**
     * @method getUserPlatformSession
     * @static
     * @async
     * @param {string} userId 
     * @param {string} platform 
     * @returns {Promise<UserSession>}
     */
    private static async getUserPlatformSession(userId: string, platform: DeviceMobileCategory) {

        let userSession = await UserSession.findOne({userId});

        if(!userSession) {
            userSession = new UserSession();
            userSession.userId = userId;
            userSession.platform = platform;
        }

        return userSession;
    }

    /**
     * @method getAuthToken
     * @static
     * @param param0 
     * @param {number} ttlInHours 
     * @returns {string}
     */
    private static async getAuthToken(userId:string, ttlInHours:number) {
        const user = await User.findById(userId)
        if(user){
            const PAYLOAD: IAuthPayload = { id:user._id.toString(), userType:user.userType };

            return JwtHelper.generateToken(
                PAYLOAD, 
                `${ttlInHours}h`
            );
        }
       
    }

}

export default SessionHelpers;