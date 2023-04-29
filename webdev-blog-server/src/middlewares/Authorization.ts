import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../lib/exceptions";

/**
 * @class Authorization
 *
 */
class Authorization {
    /**
     * @method userIsAdmin
     * @static
     * @async
     * @param {Request}req
     * @param {Response}res
     * @param {NextFunction}next
     */
    static async userIsAdmin(req: any, res: Response, next: NextFunction) {
        try {
            if (req.user) {
                if (req.user.userType !== "Admin") {
                    throw new UnauthorizedError(
                        "you do not have permission for this action"
                    );
                }

                next();
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method userIsWriter
     * @static
     * @async
     * @param {Request}req
     * @param {Response}res
     * @param {NextFunction}next
     */
    static async userIsWriter(req: any, res: Response, next: NextFunction) {
        try {
            if (req.user) {
                if (req.user.userType !== "Admin" || req.user.userType !== "Writer") {
                    throw new UnauthorizedError(
                        "you do not have permission for this action"
                    );
                }

                next();
            }
        } catch (error) {
            next(error);
        }
    }
}

export default Authorization;
