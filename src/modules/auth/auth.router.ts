import { Router } from "express";
import { authController } from "./auth.controller";
import authRole from "../../middlewares/authRole";



const router = Router();




router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser)
router.get("/me", authRole("ADMIN", "LANDLORD", "TENANT"), authController.getProfile)




export const authRouter = router;