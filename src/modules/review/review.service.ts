import prisma from "../../lib/prisma";
import { IReview } from "./review.interface";






const createReview = async (payload: IReview, tenantId: string) => {
    const { propertyId, rating } = payload;

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
    if (!(rating <= 5 && rating >= 2)) {
        throw new Error("Rating must be between 2 and 5")
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