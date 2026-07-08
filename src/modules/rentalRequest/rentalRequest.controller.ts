import { NextFunction, Request, Response } from "express";
import { catchAsyncFunc } from "../../utility/tryCatchAsync"
import status from "http-status";
import { sendRespose } from "../../utility/sendResponse";
import { rentalRequestService } from "./rentalRequest.service";

const createRantalRequest = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
        const tenantId = req.presentUser?.id
        const payload = req.body;


        const result = await rentalRequestService.createRantalRequest(payload, tenantId as string)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Successfully created rental Request",
            data: result
        });
    }
);


const getAllOwnRequest = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
        const tenantId = req.presentUser?.id

        const result = await rentalRequestService.getAllOwnRequest(tenantId as string)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Retrive your own rental-request",
            data: result
        });
    }
);


const getrentalRequestById = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
       const requestId = req.params.id 

        const result = await rentalRequestService.getrentalRequestById(requestId as string)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Retrive your rental-request details",
            data: result
        });
    }
)


export const rentalRequestController = {
    createRantalRequest,
    getAllOwnRequest,
    getrentalRequestById
}




