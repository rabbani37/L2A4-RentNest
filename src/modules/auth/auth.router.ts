import { Router } from "express";
import { authController } from "./auth.controller";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";


const router = Router();




router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser)
router.get("/me", authRole(UserRole.LANDLORD, UserRole.TENANT), authController.getProfile)




export const authRouter = router;