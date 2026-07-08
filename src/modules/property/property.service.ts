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
}





export const propertyService = {
    createProperties,
    updatePropertyById
}


