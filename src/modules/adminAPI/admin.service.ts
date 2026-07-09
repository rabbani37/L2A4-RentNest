import prisma from "../../lib/prisma";




const getAllUserByAdmin = async () => {

    const users = await prisma.user.findMany({
        omit:{password:true}
    })
    return users;
};





export const adminService = {
    getAllUserByAdmin
}