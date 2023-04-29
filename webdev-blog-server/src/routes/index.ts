import express, { Request, Response, NextFunction } from "express";
import { NotFoundHandler } from "../lib/middlewares";
import Verification from "./verification"
import Auth from "./auth"
import User from "./user"
import Blog from "./blog"


const apiV1 = express.Router();


apiV1.use("/verify", Verification)
apiV1.use("/auth", Auth)
apiV1.use("/user", User)
apiV1.use("/blog", Blog)
apiV1.use(NotFoundHandler);

export default apiV1; 
