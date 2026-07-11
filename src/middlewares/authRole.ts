import { NextFunction, Request, Response } from "express"
import { catchAsyncFunc } from "../utility/tryCatchAsync"
import { jwtToken } from "../utility/jwt";
import { UserRole } from "../../generated/prisma/enums";
import { JwtPayload } from "jsonwebtoken";
import status from "http-status";
import prisma from "../lib/prisma";


const authRole = (...requiredRole: UserRole[]) => {
    return catchAsyncFunc(async (req: Request, res: Response, next: NextFunction) => {


        const token = req.cookies.accessToken ? req.cookies.accessToken :
            req.headers.authorization?.startsWith("Besre ") ?
                req.headers.authorization?.split(" ")[1] : req.headers.authorization;
        if (!token) {
            throw new Error("You're not login. Please login to access this resourc")
        };


        const validToken = jwtToken.verifyToken(token, "access");
        if (validToken.success === false) {
            throw new Error(validToken.error)
        };


        const { id, role } = validToken.validToken as JwtPayload;

        if (!requiredRole.includes(role)) {
            res.status(status.FORBIDDEN).json({
                success: false,
                statusCode: status.FORBIDDEN,
                message: "Forbidden, You don't have permission to access this resoruse."
            })
        };

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            throw new Error("User Not Found. Please login again ");
        }
        if (user.status === "BANNED") {
            throw new Error("You're account is blocked. Please contact to support")
        };

        req.presentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        next();
    })
};
export default authRole;