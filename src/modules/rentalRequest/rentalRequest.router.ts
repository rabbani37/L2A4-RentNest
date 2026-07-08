import { Router } from "express";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";
import { rentalRequestController } from "./rentalRequest.controller";




const router = Router();



router.post("/", authRole(UserRole.TENANT), rentalRequestController.createRantalRequest)
router.get("/", authRole(UserRole.TENANT), rentalRequestController.getAllOwnRequest)
router.get("/:id", authRole(UserRole.TENANT), rentalRequestController.getrentalRequestById)





export const rentalRequestRouter = router;