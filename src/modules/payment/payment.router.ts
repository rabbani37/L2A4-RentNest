import { Router } from "express";
import { paymetnsController } from "./payment.controller";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";







const router = Router();

router.post("/create", authRole(UserRole.TENANT), paymetnsController.createPayments)
router.post("/webhook", paymetnsController.handleWebhook)

router.get("/",paymetnsController.getUsersPaymentHistory)
router.get("/:id",paymetnsController.getUserPaymentHistoryById)






export const paymentRouter = router;