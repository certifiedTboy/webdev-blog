import { NextFunction, Request, Response } from "express";
import JwtHelper from "../utils/auth/JWT";
import { IUserRequest } from "../interfaces/IUserRequest";
import { UnauthenticatedError } from "../lib/exceptions";

/**
 * @function Authenticate
 * @description Middleware to perform authentication in API routes
 * @param {IUserRequest} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const Authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers["authorization"];

        const authToken = _checkThatValidTokenFormatIsProvided(authHeader);
        const authPayload = JwtHelper.verifyToken(authToken);
        (req as IUserRequest).user = authPayload;
        next();
    } catch(err) {
        next(err);
    }
};

/**
 * @function _checkThatValidTokenFormatIsProvided
 * @param {string|undefined} authToken 
 * @returns {string} auth token
 */
const _checkThatValidTokenFormatIsProvided = (authToken: string|undefined): string => {
    let splitToken;

    if (!authToken ||
        (splitToken = authToken.split(" ")).length !== 2 ||
        splitToken[0].toLowerCase() !== "bearer" ||
        !splitToken[1]
    ) { throw new UnauthenticatedError("Invalid token!"); }

    return splitToken[1];
}

export default Authenticate;