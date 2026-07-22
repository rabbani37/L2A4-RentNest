import { PropertyAvailability } from "../../../generated/prisma/enums";

export const validateRentalStatusInput = (status: any) => {
    if (!status || !["APPROVED", "REJECTED"].includes(status)) {
        throw new Error("Status must be either APPROVED or REJECTED");
    }
};


export const validatePropertyInput = (data: any) => {
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


export const validateUpdatePropertyInput = (data: any) => {

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