import { Request, Response, NextFunction } from "express";
const perfectExpressSanitizer = require("perfect-express-sanitizer");
import { UnprocessableError } from "../../lib/exceptions";

/**
 * @class DataInputSanitizer
 */
class DataInputSanitizer {
  /**
   * @method sanitizeBlogInputData
   * @static
   * @param {string} title
   * @param {string} description
   * @param {string} category
   * @returns {void}
   */
  static async sanitizeBlogInputData(req: Request, res: Response, next: NextFunction):Promise<void> {
    const { title, description, category } = req.body;
    try {
   
       

    } catch (error) {
      next(error);
    }
  }

}

export default DataInputSanitizer;
