import { UserStatus } from "../../../generated/prisma/enums";

export const validateUserStatusInput = (status: UserStatus) => {
    if (!status || !["ACTIVE", "BANNED"].includes(status)) {
        throw new Error("Status must be either ACTIVE or BANNED");
    }
};