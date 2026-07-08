import prisma from "../../lib/prisma";
import { IProperty } from "./property.interface";



const createProperties = async (payload: IProperty, landlordId: string) => {

    const property = await prisma.property.create({
        data: {
            ...payload,
            landlordId
        }
    });
    return property;

};







export const propertyService = {
    createProperties
}


