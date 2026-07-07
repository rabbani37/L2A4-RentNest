
import configIndex from "../../config/config.index";
import prisma from "../../lib/prisma";
import { jwtToken } from "../../utility/jwt";
import { ILoginUser, IRegisterUser } from "./auth.interface";
import bcrypt from "bcrypt"


const registerUser = async (payload: IRegisterUser) => {
    const { name, email, password, role } = payload;
    const isExistUser = await prisma.user.findUnique({
        where: { email }
    });

    if (isExistUser) {
        throw new Error("User already exsist using this email")
    }

    const hashPass = await bcrypt.hash(password, Number(configIndex.bcrypt_salt_rounds))

    const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPass,
            role
        },
        omit: {
            password: true
        }
    })

    return createUser;
};;

const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload
    const isExistUser = await prisma.user.findUnique({
        where: { email }
    });

    if (!isExistUser) {
        throw new Error("User not found! Please provide valid email")
    };
    const isPassHash = await bcrypt.compare(password, isExistUser.password,)
    if (!isPassHash) {
        throw new Error("Invalid Credentials")
    };

    const payloadJwt = {
        name: isExistUser.name,
        email: isExistUser.email,
        role: isExistUser.role
    }
    const accessToken = jwtToken.createToken(payloadJwt, configIndex.jwt_access_secret, configIndex.token_access_expaired);
    const refreshToken = jwtToken.createToken(payloadJwt, configIndex.jwt_refresh_secret, configIndex.token_refresh_expaired);

    return { accessToken, refreshToken }
}


const getProfile = () => {


}



export const authService = {
    registerUser,
    loginUser,
    getProfile
}

