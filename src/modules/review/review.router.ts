import { Router } from "express";
import { reviewController } from "./review.controller";
import authRole from "../../middlewares/authRole";




const router = Router();



router.post("/",authRole("TENANT"),reviewController.createReview)



export const reviewRouter = router;