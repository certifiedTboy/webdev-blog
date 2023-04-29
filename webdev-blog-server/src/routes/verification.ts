import express from "express";
import VerificationController from "../controllers/verificationController";
import AuthenticationValidator from "../middlewares/validators/AuthenticationValidator";
const router = express.Router();

router.post(
    "/email", AuthenticationValidator.checkEmailValidity,
    VerificationController.createEmailVerification
);

router.post("/email/create-user", VerificationController.emailVerification)
router.post("/email/verify-email", VerificationController.emailVerification)



export default router;
