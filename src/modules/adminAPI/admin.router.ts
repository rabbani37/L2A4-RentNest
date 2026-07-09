import { Router } from "express";
import { adminController } from "./admin.controller";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";






const router = Router();


router.get("/properties", authRole(UserRole.ADMIN),adminController.getallPropertiesByAdmin)
router.patch("/users/:id",authRole(UserRole.ADMIN), adminController.updateUserStatusByIdTroughAdmin)
router.get("/users", authRole(UserRole.ADMIN), adminController.getAllUserByAdmin)
router.get("/rentals" ,authRole(UserRole.ADMIN),adminController.getAllRentalRequest)


export const adminRouter = router;