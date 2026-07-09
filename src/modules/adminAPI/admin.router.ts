import { Router } from "express";
import { adminController } from "./admin.controller";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";






const router = Router();


router.get("/users", authRole(UserRole.ADMIN), adminController.getAllUserByAdmin)
// router.patch("/users/:id")
// router.get("/properties")
// router.get("/rentals")


export const adminRouter = router;