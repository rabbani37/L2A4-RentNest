import { UserStatus } from "../../../generated/prisma/enums";
import prisma from "../../lib/prisma";




const getAllUserByAdmin = async () => {

    const users = await prisma.user.findMany({
        omit: { password: true }
    })
    return users;
};


const updateUserStatusByIdTroughAdmin = async (userStatus: UserStatus, userId: string) => {

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { status: userStatus }
    });

    return updatedUser;
};


const getallPropertiesByAdmin = async () => {

    const properties = await prisma.property.findMany()
    return properties
}

const getAllRentalRequest = async() => {
  const rentalRequest = await prisma.rentalRequest.findMany()
    return rentalRequest
}




export const adminService = {
    getAllUserByAdmin,
    updateUserStatusByIdTroughAdmin,
    getallPropertiesByAdmin,
    getAllRentalRequest
}