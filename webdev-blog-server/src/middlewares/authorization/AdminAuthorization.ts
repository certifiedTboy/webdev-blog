import { Request, Response, NextFunction } from "express";

import { UnauthorizedError, UnprocessableError } from "../../lib/exceptions";

/**
 * @class AdminAuthorization
 */
class AdminAuthorization {
  /**
   * @method checkUserIsAdmin
   * @static
   * @returns {string}
   */
  static async checkUserIsAdmin(req: any, res: Response, next: NextFunction) {
   try{
    
        if(req.user.userType === "Admin"){
            next()
        }else{
            throw new UnauthorizedError("you're not authorized to perform this action")
        }
      
   }catch(error){
    next(error)
   }
  }

  
}

export default AdminAuthorization;
