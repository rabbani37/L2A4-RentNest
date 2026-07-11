import { NextFunction, Request, Response } from "express";
import { catchAsyncFunc } from "../../utility/tryCatchAsync";
import { authService } from "./auth.service";
import status from "http-status";
import { sendRespose } from "../../utility/sendResponse";



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
);;


const loginUser = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;
        const { accessToken, refreshToken } = await authService.loginUser(payload);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24, // 1Day
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7Day
        });


        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Login successfully",
            data: { accessToken, refreshToken }
        });
    }
)


const getProfile = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.presentUser?.id
        const result = await authService.getProfile(id as string)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Successfully retrieved your profiel",
            data: result
        });
    }
);;






export const authController = {
    registerUser,
    loginUser,
    getProfile
}
