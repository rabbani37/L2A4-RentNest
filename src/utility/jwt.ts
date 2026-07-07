import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import configIndex from "../config/config.index";


const createToken = (payload: JwtPayload, secret: string, expaired: string) => {
    const token = jwt.sign(payload, secret, { expiresIn: expaired } as SignOptions);
    return token
};

const verifyToken = (token: string, secret: "access" | "refresh") => {
    const secretData = secret === "access" ? configIndex.jwt_access_secret : configIndex.jwt_refresh_secret
    try {
        const validToken = jwt.verify(token, secretData);
        return { success: true, validToken }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export const jwtToken = {
    createToken,
    verifyToken
}