export const validateRentalRequestInput = (data: any) => {
    if (!data.propertyId || data.propertyId.trim() === "") {
        throw new Error("Property ID is required");
    }

    if (data.moveInDate !== undefined && isNaN(Date.parse(data.moveInDate))) {
        throw new Error("Invalid move-in date format");
    }

    if (data.message !== undefined && typeof data.message !== "string") {
        throw new Error("Message must be a string ");
    }
};