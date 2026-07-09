import { NextFunction, Request, Response } from "express";
import { catchAsyncFunc } from "../../utility/tryCatchAsync";
import status from "http-status";
import { sendRespose } from "../../utility/sendResponse";
import { adminService } from "./admin.service";




const getAllUserByAdmin = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {


        const result = await adminService.getAllUserByAdmin()
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Congratulation your registration successfull",
            data: result
        });
    }
);




export const adminController = {
    getAllUserByAdmin
}