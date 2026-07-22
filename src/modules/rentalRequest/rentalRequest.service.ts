import prisma from "../../lib/prisma"
import { IRentalRequest } from "./rentalRequest.interface"
import { validateRentalRequestInput } from "./validateRentalrequestInput";


const createRantalRequest = async (payload: IRentalRequest, tenantId: string) => {

    
    validateRentalRequestInput(payload);

    const { propertyId, moveInDate, message } = payload;

    const property = await prisma.property.findUnique({
        where: { id: propertyId }
    });

    if (!property) {
        throw new Error("Property not found");
    }

   
    const existingRequest = await prisma.rentalRequest.findFirst({
        where: {
            tenantId,
            propertyId,
            status: "PENDING",
        },
    });

    if (existingRequest) {
        throw new Error("Your previous request on this property is still pending approval. You cannot submit another request until it has been reviewed.");
    }

  
    const rentalRequest = await prisma.rentalRequest.create({
        data: {
            propertyId,
            moveInDate: moveInDate ? new Date(moveInDate) : undefined,
            message,
            tenantId,
            status: "PENDING", 
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