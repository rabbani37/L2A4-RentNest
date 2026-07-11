import prisma from "../../lib/prisma";
import { IReview } from "./review.interface";
import { validateReviewInput } from "./validateReviewInput";






const createReview = async (payload: IReview, tenantId: string) => {
    const { propertyId } = payload;

    validateReviewInput(payload)

    const completedRentalRquest = await prisma.rentalRequest.findFirst({
        where: {
            tenantId,
            propertyId,
            status: "COMPLETED",
        }
    });
    if (!completedRentalRquest) {
        throw new Error("You can only review properties you have completed renting")
    }


    const review = await prisma.review.create({
        data: {
            ...payload,
            tenantId
        }
    })
    return review;
};





export const reviewService = {
    createReview
}