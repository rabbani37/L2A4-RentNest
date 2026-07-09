import { error } from "node:console";
import prisma from "../../lib/prisma";
import { IProperty, IUpdateProperty } from "./property.interface";
import { RentalRequestStatus } from "../../../generated/prisma/enums";



const createProperties = async (payload: IProperty, landlordId: string) => {

    const property = await prisma.property.create({
        data: {
            ...payload,
            landlordId
        },
        include: { landlord: true, category: true }
    });
    return property;

};

const updatePropertyById = async (payload: IUpdateProperty, propertyId: string) => {

    const proprety = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!proprety) {
        throw new Error("Not Found Property")
    };

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



const getAllProperties = async () => {
    const properties = await prisma.property.findMany()
    return properties;
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


