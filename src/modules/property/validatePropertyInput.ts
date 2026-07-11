export const validateRentalStatusInput = (status: any) => {
    if (!status || !["APPROVED", "REJECTED"].includes(status)) {
        throw new Error("Status must be either APPROVED or REJECTED");
    }
};
