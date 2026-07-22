import { error } from "node:console";
import prisma from "../../lib/prisma";
import { IProperty, IUpdateProperty } from "./property.interface";
import { PropertyAvailability, RentalRequestStatus } from "../../../generated/prisma/enums";
import { validatePropertyInput, validateRentalStatusInput, validateUpdatePropertyInput } from "./validatePropertyInput";



const createProperties = async (payload: IProperty, landlordId: string) => {

    validatePropertyInput(payload);

    const property = await prisma.property.create({
        data: {
            ...payload,
            landlordId
        },
        include: { landlord: true, category: true }
    });
    return property;

};















const updatePropertyById = async (payload: IUpdateProperty, propertyId: string, landlordId: string) => {



    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) {
        throw new Error("Not Found Property")
    };

    if (property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this property");
    }

    validateUpdatePropertyInput(payload)

    const result = await prisma.property.update({
        where: { id: propertyId },
        data: {
            ...payload
        }
    })
    return result;
};
















const deletePropertyById = async (propertyId: string) => {
    const proprety = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!proprety) {
        throw new Error("Not Found Property")
    };

    return await prisma.property.delete({ where: { id: propertyId } })
};



const getAllProperties = async (query: any) => {
    const andCondition: any[] = [];

  
    if (query.location) {
        andCondition.push({
            OR: [
                {
                    location: {
                        contains: query.location,
                        mode: "insensitive",
                    },
                },
                {
                    city: {
                        contains: query.location,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }


    if (query.minPrice || query.maxPrice) {
        const priceCondition: any = {};
        if (query.minPrice) priceCondition.gte = Number(query.minPrice);
        if (query.maxPrice) priceCondition.lte = Number(query.maxPrice);
        andCondition.push({ price: priceCondition });
    }

   
    if (query.type) {
        andCondition.push({
            category: {
                name: {
                    equals: query.type,
                    mode: "insensitive",
                },
            },
        });
    }

    const properties1 = await prisma.property.findMany({
        where: {
            AND: andCondition,
        },
        include: {
            category: true,
            landlord: {
                select: { id: true, name: true, email: true, phone: true },
            },
        },
    });

    return properties1;


}


const getPropertyById = async (propertyId: string) => {
    const proprety = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!proprety) {
        throw new Error("Not Found Property")
    };
    return proprety;
};


const getAllRentalRequests = async (landlordId: string) => {

    const rentalRequest = await prisma.rentalRequest.findMany({
        where: {
            property: { landlordId },
        }
    });
    if (rentalRequest.length === 0) {
        throw new Error("No Found! Rental Rquest under the Properties of Login user")
    }

    return rentalRequest;
};

const updateStatusOfRentalRequest = async (statusValue: RentalRequestStatus, landlordId: string, requestId: string) => {


    validateRentalStatusInput(statusValue);

    const request = await prisma.rentalRequest.findUnique({
        where: { id: requestId },
        include: { property: true }
    });
    if (!request) {
        throw new Error("This request Not Found!")
    };
    if (request.property.landlordId !== landlordId) {
        throw new Error("You are not authorized to update this request")
    };

    if (request.status !== "PENDING") {
        throw new Error(`Cannot update status. Current status is already ${request.status}`);
    }


    const updateStatusRequest = await prisma.rentalRequest.update({
        where: { id: requestId },
        data: { status: statusValue }
    })
    return updateStatusRequest;
}







export const propertyService = {
    createProperties,
    updatePropertyById,
    deletePropertyById,
    getAllProperties,
    getPropertyById,
    getAllRentalRequests,
    updateStatusOfRentalRequest
}


