const { OAuth2Client } = require("google-auth-library");
import config from "../../config/config";
const client = new OAuth2Client(config.GOOGLE_OAUTH_CLIENT_SECRET);

/**
 * @class GoogleOauth
 */
class GoogleOauth {
  /**
   * @method verifyToken
   * @static
   * @async
   * @param {string} token
   * @returns {Object}
   */
  static async verifyToken(
   token: string,
    
  ) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_OAUTH_CLIENT_ID,
      });

      const {given_name, family_name, email, picture } =  ticket.getPayload();

     return {given_name, family_name, email, picture}
  }


}

export default GoogleOauth;




 