import express from "express";
import { NotFoundHandler } from "../lib/middlewares";
import Authenticate from "../middlewares/Authenticate";
import AdminAuthorization from "../middlewares/authorization/AdminAuthorization";
import Verification from "./verification";
import Auth from "./auth";
import User from "./user";
import Blog from "./blog";
import Admin from "./admin";
import Counter from "./counter"

const apiV1 = express.Router();

apiV1.use("/verify", Verification);
apiV1.use("/auth", Auth);
apiV1.use("/user", User);
apiV1.use("/blog", Blog);
apiV1.use("/counter", Counter)
apiV1.use("/admin", Authenticate, AdminAuthorization.checkUserIsAdmin, Admin);
apiV1.use(NotFoundHandler);

export default apiV1;
