import { Router } from "express";
import { properController } from "./property.controller";
import authRole from "../../middlewares/authRole";




const router = Router();




router.post("/properties", authRole("ADMIN", "LANDLORD"), properController.createProperties)
// router.put("/properties/:id")
// router.delete("/properties/:id")

// router.get("/requests")
// router.patch("/requests/:id")






export const propertyRouter = router