import { RentalRequestStatus } from "../../../generated/prisma/enums";


export interface IRentalRequest {
    tenantId: string;
    propertyId: string;
    moveInDate?: Date;
    message?: string;
}