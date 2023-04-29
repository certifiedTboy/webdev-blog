import config from "../../config/config"
import transport from "../../utils/email/transport";

/**
 * @class EmailHelper
 */
 class EmailHelper {

    /**
   
     * @param {string} email
    
     */
    static async sendVerificationUrl(
        email: string, 
        verificationUrl: string, 
    ): Promise<any> {
        const mailOptions = {
            to: email,
            from: config.SMTP_USER,
            subject: "Welcome to WedDev Blog",
            html: `<div><p> Dear <strong>Valid user</strong> </p>
            <h4> You are a step closer !!! </h4>
            <p> Use the button below to complete your account</p>
            <a href=${verificationUrl}>Create Account</a>
            <p>Thanks </p>.
            <div>`,
          };
    
          await transport.sendMail(mailOptions)
         
    }

}

export default EmailHelper;