
import { UserRole } from "../../../generated/prisma/enums";
import configIndex from "../../config/config.index";
import prisma from "../../lib/prisma";
import { jwtToken } from "../../utility/jwt";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import bcrypt from "bcrypt"
import { validateLoginInput, validateRegisterInput } from "./validateAuthInput";


const registerUser = async (payload: IRegisterUser) => {
    const { email, password, } = payload;

    validateRegisterInput(payload)
    const isExistUser = await prisma.user.findUnique({
        where: { email }
    });

    if (isExistUser) {
        throw new Error("User already exsist using this email")
    }

    const hashPass = await bcrypt.hash(password, Number(configIndex.bcrypt_salt_rounds))

    const createUser = await prisma.user.create({
        data: {
            ...payload,
            password: hashPass,

        },
        omit: {
            password: true
        }
    })

    return createUser;
};;









const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload


    validateLoginInput(payload)


    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("User not found! Please provide valid email")
    };

    if (user.status === "BANNED") {
        throw new Error("Your account has been banned. Please contact support.");
    };

    const isPassHash = await bcrypt.compare(password, user.password,)
    if (!isPassHash) {
        throw new Error("Invalid Credentials")
    };

    const payloadJwt = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const accessToken = jwtToken.createToken(payloadJwt, configIndex.jwt_access_secret, configIndex.token_access_expaired);
    const refreshToken = jwtToken.createToken(payloadJwt, configIndex.jwt_refresh_secret, configIndex.token_refresh_expaired);

    return { accessToken, refreshToken }
};;










const getProfile = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: { id },
        omit: { password: true }
    });
    return user;

};;



export const authService = {
    registerUser,
    loginUser,
    getProfile
}

