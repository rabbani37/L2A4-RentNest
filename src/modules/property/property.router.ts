import { Router } from "express";
import { properController } from "./property.controller";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";



const router = Router();



router.post("/properties", authRole(UserRole.LANDLORD, UserRole.ADMIN), properController.createProperties)
router.put("/properties/:id", properController.updatePropertyById)
// router.delete("/properties/:id")

// router.get("/requests")
// router.patch("/requests/:id")






export const propertyRouter = router