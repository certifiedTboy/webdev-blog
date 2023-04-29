import express, { Request, Response } from "express";
import { ResponseHandler } from "../lib/helpers";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    return ResponseHandler.ok(res, { message: "Weddev server is live" });
});



export default router;