import prisma from "../../lib/prisma"
import { IRentalRequest } from "./rentalRequest.interface"


const createRantalRequest = async (payload: IRentalRequest, tenantId: string) => {
    const { propertyId } = payload;
    const request = await prisma.rentalRequest.findUnique({
        where: { id: propertyId }
    });
    if (request?.status === "PENDING") {
        throw new Error("Your previous request on this post is still pending approval. You cannot submit another request until it has been reviewed.");
    }

    const rentalRequest = await prisma.rentalRequest.create({
        data: {
            ...payload,
            tenantId
        }
    });

    return rentalRequest;

}


const getAllOwnRequest = async (tenantId: string) => {

    const requests = await prisma.rentalRequest.findMany({
        where: { tenantId },
        include: { tenant: true }
    });
    return requests;
}








export const rentalRequestService = {
    createRantalRequest,
    getAllOwnRequest
}