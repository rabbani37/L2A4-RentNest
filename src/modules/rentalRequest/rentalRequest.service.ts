import prisma from "../../lib/prisma"
import { IRentalRequest } from "./rentalRequest.interface"
import { validateRentalRequestInput } from "./validateRentalrequestInput";


const createRantalRequest = async (payload: IRentalRequest, tenantId: string) => {

    validateRentalRequestInput(payload)

    const { propertyId } = payload;
    const request = await prisma.rentalRequest.findUnique({
        where: { id: propertyId }
    });
    if (!request) {
        throw new Error("Rental request Not Found")
    }

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
};


const getrentalRequestById = async (requestId: string) => {

    const request = await prisma.rentalRequest.findUnique({
        where: { id: requestId }
    });
    if (!request) {
        throw new Error("Your Renta request Not Found!")
    }
    return request;
}








export const rentalRequestService = {
    createRantalRequest,
    getAllOwnRequest,
    getrentalRequestById
}