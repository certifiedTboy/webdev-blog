import { Request, Response, NextFunction } from "express";
import AdminHelpers from "../helpers/admin/AdminHelpers";
import { ResponseHandler } from "../lib/helpers";

/**
 * @class AdminController
 */

class AdminController {
  /**
   *
   * @method getAllRegisteredUsers
   * @static
   * @async
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @returns {User}
   */

  static async getAllRegisteredUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const users = await AdminHelpers.registeredUsers()
      ResponseHandler.ok(res, users, "success");
    } catch (error) {
      next(error);
    }
  }

   /**
   *
   * @method getAllBlogs
   * @static
   * @async
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @returns {User}
   */

    static async getAllBlogs(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> {
        try {
          const blogs = await AdminHelpers.allBlogs()
          ResponseHandler.ok(res, blogs, "success");
        } catch (error) {
          next(error);
        }
      }
/**
   *
   * @method increaseVisits
   * @static
   * @async
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @returns {User}
   */

    static async increaseVisits(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> {
      try {
        const visits = await AdminHelpers.visitIncrease(req.ip)
        ResponseHandler.ok(res, visits, "success");
      } catch (error) {
        next(error);
      }
    }

    /**
   *
   * @method getVisits
   * @static
   * @async
   * @param {Request}req
   * @param {Response}res
   * @param {NextFunction}next
   * @returns {User}
   */

     static async getVisits(
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> {
      try {
       
        const visits = await AdminHelpers.totalVisits()
        ResponseHandler.ok(res, visits, "success");
      } catch (error) {
        next(error);
      }
    }
}

export default AdminController;
