import { Router } from "express";
import { properController } from "./property.controller";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";



const router = Router();



router.post("/properties", authRole(UserRole.LANDLORD), properController.createProperties);

router.put("/properties/:id", authRole(UserRole.LANDLORD), properController.updatePropertyById);

router.delete("/properties/:id", authRole(UserRole.LANDLORD), properController.deletePropertyById);

router.get("/requests", authRole(UserRole.LANDLORD), properController.getAllRentalRequests);

router.patch("/requests/:id", authRole(UserRole.LANDLORD),properController.updateStatusOfRentalRequest);

router.get("/", properController.getAllProperties);
router.get("/:id", properController.getPropertyById);






export const propertyRouter = router