import {Request, Response, NextFunction} from "express"
import { ResponseHandler } from "../lib/helpers";
import VerificationHelper from "../helpers/verificationHelpers/verificationHelper";
import EmailHelper from "../helpers/email/EmailHelper";

/**
 * @class VerificationController
 */
class VerificationController {

    /**
     * @method createEmailVerification
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
    static async createEmailVerification(req: Request, res: Response, next: NextFunction):Promise<any> {
        try {
            const { email } = req.body;

            const createdData = await VerificationHelper.createVerificationData(email);
        
            if(createdData){
                const newData = {verificationUrl:createdData}
                // await EmailHelper.sendVerificationUrl(email, createdData)
                console.log(newData)
                ResponseHandler.created(res, newData);
            }
        } catch(err) {
            next(err);
        }
    }

    /**
     * @method emailVerification
     * @static
     * @async
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     * @returns {object}
     */
     static async emailVerification(req: Request, res: Response, next: NextFunction):Promise<any> {
        const { verificationToken, verificationId } = req.body;
        try {
            const createdData = await VerificationHelper.verifyEmail(verificationId, verificationToken);
        
           if(createdData){
            ResponseHandler.created(res, createdData, "new user created")
           }
        } catch(err) {
            next(err);
        }
    }

    
}

export default VerificationController;