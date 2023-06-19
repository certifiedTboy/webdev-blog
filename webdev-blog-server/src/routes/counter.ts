import express from "express"
import AdminController from "../controllers/adminController";

const router = express.Router()

router.post("/increase-visits", AdminController.increaseVisits)


export default router