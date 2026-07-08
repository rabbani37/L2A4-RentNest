import prisma from "../../lib/prisma";
import { IProperty, IUpdateProperty } from "./property.interface";



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

    return rentalRequest;
}


export const propertyService = {
    createProperties,
    updatePropertyById,
    deletePropertyById,
    getAllProperties,
    getPropertyById,
    getAllRentalRequests
}


