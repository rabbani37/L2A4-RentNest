export const validateReviewInput = (data: any) => {
    if (!data.propertyId || data.propertyId.trim() === "") {
        throw new Error("Property ID is required");
    }

    if (data.rating === undefined || data.rating === null) {
        throw new Error("Rating is required");
    }

    if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
        throw new Error("Rating must be an integer between 1 and 5");
    }

    if (!data.comment || data.comment.trim() === "") {
        throw new Error("Comment is required");
    }
};