import express from "express";
import AuthController from "../controllers/authController";
import AuthenticationValidator from "../middlewares/validators/AuthenticationValidator";
const router = express.Router();

router.get("/sessions/oauth/google", AuthController.googleOauthHandler);
router.post(
  "/login",
  AuthenticationValidator.checkLoginWithEmail(),
  AuthenticationValidator.checkEmailValidity,
//   AuthenticationValidator.checkPasswordValidity,
  AuthController.emailLogin
);

export default router;
