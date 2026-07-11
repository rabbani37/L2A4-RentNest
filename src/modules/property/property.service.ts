import { error } from "node:console";
import prisma from "../../lib/prisma";
import { IProperty, IUpdateProperty } from "./property.interface";
import { PropertyAvailability, RentalRequestStatus } from "../../../generated/prisma/enums";



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

const validatePropertyInput = (data: any) => {
    if (!data.title || data.title.trim() === "") {
        throw new Error("Title is required");
    }
    if (!data.description || data.description.trim() === "") {
        throw new Error("Description is required");
    }
    if (!data.price || data.price <= 0) {
        throw new Error("Price must be a positive number");
    }
    if (!data.location || data.location.trim() === "") {
        throw new Error("Location is required");
    }
    if (!data.city || data.city.trim() === "") {
        throw new Error("City is required");
    }
    if (!data.bedrooms || data.bedrooms <= 0) {
        throw new Error("Bedrooms must be a positive number");
    }
    if (!data.bathrooms || data.bathrooms <= 0) {
        throw new Error("Bathrooms must be a positive number");
    }
    if (!data.size || data.size <= 0) {
        throw new Error("Size must be a positive number");
    }
    if (!data.availability || ![PropertyAvailability.AVAILABLE, PropertyAvailability.RENTED, PropertyAvailability.UNAVAILABLE].includes(data.availability)) {
        throw new Error("Invalid availability status");
    }
    if (!data.categoryId) {
        throw new Error("Category ID is required");
    }
    if (!Array.isArray(data.amenities)) {
        throw new Error("Amenities must be an array");
    }
    if (!Array.isArray(data.images) || data.images.length === 0) {
        throw new Error("At least one image is required");
    }
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


const validateUpdatePropertyInput = (data: any) => {

    if (data.title !== undefined && data.title.trim() === "") {
        throw new Error("Title cannot be empty");
    }

    if (data.description !== undefined && data.description.trim() === "") {
        throw new Error("Description cannot be empty");
    }

    if (data.price !== undefined && data.price <= 0) {
        throw new Error("Price must be a positive number");
    }

    if (data.location !== undefined && data.location.trim() === "") {
        throw new Error("Location cannot be empty");
    }

    if (data.city !== undefined && data.city.trim() === "") {
        throw new Error("City cannot be empty");
    }

    if (data.bedrooms !== undefined && data.bedrooms <= 0) {
        throw new Error("Bedrooms must be a positive number");
    }

    if (data.bathrooms !== undefined && data.bathrooms <= 0) {
        throw new Error("Bathrooms must be a positive number");
    }

    if (data.size !== undefined && data.size <= 0) {
        throw new Error("Size must be a positive number");
    }

    if (data.amenities !== undefined && !Array.isArray(data.amenities)) {
        throw new Error("Amenities must be an array");
    }

    if (data.images !== undefined && !Array.isArray(data.images)) {
        throw new Error("Images must be an array");
    }

    if (data.availability !== undefined && !["AVAILABLE", "RENTED", "UNAVAILABLE"].includes(data.availability)) {
        throw new Error("Invalid availability status");
    }

    if (data.categoryId !== undefined && data.categoryId.trim() === "") {
        throw new Error("Category ID cannot be empty");
    }
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
const validateRentalStatusInput = (status: any) => {
    if (!status || !["APPROVED", "REJECTED"].includes(status)) {
        throw new Error("Status must be either APPROVED or REJECTED");
    }
};







export const propertyService = {
    createProperties,
    updatePropertyById,
    deletePropertyById,
    getAllProperties,
    getPropertyById,
    getAllRentalRequests,
    updateStatusOfRentalRequest
}


