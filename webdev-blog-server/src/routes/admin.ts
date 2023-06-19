import express from "express"
import AdminController from "../controllers/adminController"


const router = express.Router()


router.get("/get-registered-users", AdminController.getAllRegisteredUsers)
router.get("/get-all-blogs", AdminController.getAllBlogs)
router.get("/visits", AdminController.getVisits)






export default router