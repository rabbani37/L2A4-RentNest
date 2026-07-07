import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";


const createToken = (payload: JwtPayload, secret: string, expaired: string) => {
    const token = jwt.sign(payload, secret, { expiresIn: expaired } as SignOptions);
    return token
};



export const jwtToken = {
    createToken
}