import express from "express";
import UserController from "../controllers/userControllers";
import Authenticate from "../middlewares/Authenticate";
import UserValidator from "../middlewares/validators/UserValidator";
import upload from "../utils/multer/multer";
const router = express.Router(); 



router.put("/upload-image", Authenticate, upload.single("image"), UserController.uploadProfile);
router.post("/follow/:username", Authenticate, UserController.followUser)
router.put("/update-user", Authenticate, UserValidator.checkUpdateDataIsValid, UserController.updateUser);
router.get("/profile-picture", Authenticate, UserController.getProfilePicture)
router.get("/:username", UserController.getAUserByUsername);
router.get("/profile-picture/:username",  UserController.getOtherProfilePicture)

export default router
