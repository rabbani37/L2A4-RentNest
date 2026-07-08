import { Router } from "express";
import { properController } from "./property.controller";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";



const router = Router();



router.post("/properties", authRole(UserRole.LANDLORD, UserRole.ADMIN), properController.createProperties)

router.put("/properties/:id", authRole(UserRole.LANDLORD, UserRole.ADMIN), properController.updatePropertyById)

router.delete("/properties/:id", authRole(UserRole.LANDLORD, UserRole.ADMIN), properController.deletePropertyById)

// router.get("/requests")
// router.patch("/requests/:id")

router.get("/",properController.getAllProperties)
router.get("/:id",properController.getPropertyById)






export const propertyRouter = router