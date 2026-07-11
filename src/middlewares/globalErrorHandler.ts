import { NextFunction, Request, Response } from "express";
import status from "http-status";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    let statusCode = status.INTERNAL_SERVER_ERROR as number;
    let message = err.message || "Something went wrong";


    if (
        message.includes("not found")
    ) {
        statusCode = status.NOT_FOUND;
    } else if (
        message.includes("not authorized") ||
        message.includes("unauthorized") ||
        message.includes("banned")
    ) {
        statusCode = status.FORBIDDEN;
    } else if (
        message.includes("required") ||
        message.includes("must be") ||
        message.includes("Invalid") ||
        message.includes("already")
    ) {
        statusCode = status.BAD_REQUEST;
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorDetails: err.stack,  // It shouldn't always be stack here, but the project is only in development, that's why I kept the stack.
    });
};