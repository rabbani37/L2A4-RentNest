import { NextFunction, Request, Response } from "express";
import { catchAsyncFunc } from "../../utility/tryCatchAsync";
import { sendRespose } from "../../utility/sendResponse";
import status from "http-status";
import { categoryService } from "./category.service";




const createCategory = catchAsyncFunc(
    async (req: Request, res: Response, next: NextFunction) => {

        const result = await categoryService.createCategory(req.body)
        sendRespose(res, {
            success: true,
            statusCode: status.OK,
            message: "Successfully Created a category",
            data: result
        });
    }
);;

const getAllCategory = catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {

    const result = await categoryService.getAllCategory()
    sendRespose(res, {
        success: true,
        statusCode: status.OK,
        message: "Successfully retrived all categories",
        data: result
    });
})



export const categoryController = {
    createCategory,
    getAllCategory
}