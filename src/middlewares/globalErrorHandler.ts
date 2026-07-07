import { NextFunction, Request, Response } from "express";
import status from "http-status";



export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    res.status(status.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: status.INTERNAL_SERVER_ERROR,
        message: err.message,
        errorDetails: err.stack
    })

}
