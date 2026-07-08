import { NextFunction, Request, Response } from "express";
import { catchAsyncFunc } from "../../utility/tryCatchAsync";
import { sendRespose } from "../../utility/sendResponse";
import status from "http-status";
import { PropertyAvailability } from "../../../generated/prisma/enums";
import { propertyService } from "./property.service";





const createProperties = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {

        const landlordId = req.presentUser?.id as string;
        const payload = req.body;

        const result = await propertyService.createProperties(payload, landlordId)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Successfully Created a Property ",
            data: result
        });
    }
);



export const properController = {
    createProperties
}