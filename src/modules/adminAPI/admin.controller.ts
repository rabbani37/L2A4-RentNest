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

const updateUserStatusByIdTroughAdmin = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
        const userStatus = req.body.status;
        const userId = req.params.id;

        const result = await adminService.updateUserStatusByIdTroughAdmin(userStatus, userId as string)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "User status updated successful",
            data: result
        });
    }
)


export const adminController = {
    getAllUserByAdmin,
    updateUserStatusByIdTroughAdmin
}