import { NextFunction, Request, Response } from "express";
import { catchAsyncFunc } from "../../utility/tryCatchAsync";
import { sendRespose } from "../../utility/sendResponse";
import status from "http-status";
import { reviewService } from "./review.service";



const createReview = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {

        const tenantId = req.presentUser?.id;
        const payload = req.body;

        const result = await reviewService.createReview(payload, tenantId as string)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "review create successfully",
            data: result
        });
    }
);


export const reviewController = {
    createReview
}