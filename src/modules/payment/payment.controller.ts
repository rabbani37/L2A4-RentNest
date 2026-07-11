import { NextFunction, Request, Response } from "express";
import { catchAsyncFunc } from "../../utility/tryCatchAsync";
import { sendRespose } from "../../utility/sendResponse";
import status from "http-status";
import { paymentService } from "./payment.service";
import { sign } from "node:crypto";
import { catchall } from "zod/mini";





const createPayments = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {

        const tenantId = req.presentUser?.id
        const rentalRequestId = req.body.rentalRequestId;

        const { paymentUrl } = await paymentService.createPayments(rentalRequestId as string, tenantId as string)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Check out completed successfully  ",
            data: paymentUrl
        });
        // res.redirect(status.PERMANENT_REDIRECT, paymentUrl as string)
    }
);

const handleWebhook = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {

        const event = req.body as Buffer;
        const signature = req.headers['stripe-signature']!;

        await paymentService.handleWebhook(event, signature as string);

        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Webhook triggered successfully",
            data: null,
        });

    }
);



const getUsersPaymentHistory = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {

        const result = await paymentService.getUsersPaymentHistory()
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Successfully retrive all users payments history",
            data: result,
        });

    }
);


const getUserPaymentHistoryById = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {

        const paymentId = req.params.id;

        const result = await paymentService.getUserPaymentHistoryById(paymentId as string);

        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Successfully retrive single user payment history",
            data: result,
        });

    }
)





export const paymetnsController = {
    createPayments,
    handleWebhook,
    getUsersPaymentHistory,
    getUserPaymentHistoryById
}