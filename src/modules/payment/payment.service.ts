import { serialize } from "node:v8";
import configIndex from "../../config/config.index";
import prisma from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { error } from "node:console";




const createPayments = async (rentalRequestId: string, tenantId: string) => {

    const transctionResult = await prisma.$transaction(async (tx) => {

        const rentalRequest = await tx.rentalRequest.findUnique({
            where: { id: rentalRequestId },
            include: { property: true, tenant: true },

        });
        if (!rentalRequest) {
            throw new Error("Rental request not found");
        }
        if (rentalRequest.status !== "APPROVED") {
            throw new Error("Payment is only allowed for approved rental requests");
        }

        if (rentalRequest.tenantId !== tenantId) {
            throw new Error("You are not authorized to pay for this rental request");
        }

        // const stripeCoustomerId = await prisma.rentalRequest.transactionId
        const session = await stripe.checkout.sessions.create({
            customer_email: rentalRequest.tenant.email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: rentalRequest.property.title
                        },
                        unit_amount: Number(rentalRequest.property.price) * 100
                    },
                    quantity: 1
                }

            ],

            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${configIndex.app_url}/payments/confirm`,
            cancel_url: `${configIndex.app_url}/payments/cancel`,
            metadata: {
                tenantId: tenantId,
                rentalRequestId: rentalRequest.id,
            }

        });


        await tx.payment.create({
            data: {
                transactionId: session.id,
                rentalRequestId: rentalRequest.id,
                tenantId: tenantId,
                amount: rentalRequest.property.price,
                provider: "STRIPE",
                status: "PENDING"
            },
        });

        return session.url;
    });

    const paymentUrl = transctionResult
    return { paymentUrl }


};



const handleWebhook = async (eventPayload: Buffer, signature: string) => {

    const endpointSecret = configIndex.stripe_webhook_secret
    const event = stripe.webhooks.constructEvent(
        eventPayload,
        signature,
        endpointSecret
    );


    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;

            const payment = await prisma.payment.update({
                where: { transactionId: session.id },
                data: {
                    status: "COMPLETED",
                    paidAt: new Date(),
                    method: "card"
                },
            });

            await prisma.rentalRequest.update({
                where: { id: payment.rentalRequestId },
                data: { status: "ACTIVE" },
            });

            break;
        }
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

};;



const getUsersPaymentHistory = async () => {
    const paymets = await prisma.payment.findMany();
    if (!paymets) {
        throw new Error("Payment histroy not found")
    }
    return paymets;

};


const getUserPaymentHistoryById = async (paymentId: string) => {
    const payments = await prisma.payment.findUnique({
        where: { id: paymentId }
    });

    if (!payments) {
        throw new Error("Payment histroy not found")
    };

    return payments;
}



export const paymentService = {
    createPayments,
    handleWebhook,
    getUsersPaymentHistory,
    getUserPaymentHistoryById
}