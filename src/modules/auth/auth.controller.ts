import { NextFunction, Request, Response } from "express";
import { catchAsyncFunc } from "../../utility/tryCatchAsync";
import { authService } from "./auth.service";
import status from "http-status";
import { sendRespose } from "../../utility/sendResponse";
import { waitForDebugger } from "node:inspector";



const registerUser = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body
        const result = await authService.registerUser(payload);

        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Congratulation your registration successfull",
            data: result
        });
    }
);


const loginUser = catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(payload);

    sendRespose(res, {
        success: true,
        statusCode: status.OK,
        message: "Login successfully",
        data: { accessToken, refreshToken }
    });
})







export const authController = {
    registerUser,
    loginUser
}
