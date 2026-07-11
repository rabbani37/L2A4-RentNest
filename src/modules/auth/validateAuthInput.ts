import { UserRole } from "../../../generated/prisma/enums";

export const validateRegisterInput = (data: any) => {
    if (!data.name || data.name.trim() === "") {
        throw new Error("Name is required");
    }
    if (!data.email || !data.email.includes("@")) {
        throw new Error("A valid email is required");
    }
    if (!data.password || data.password.length < 4) {
        throw new Error("Password must be at least 4 characters long");
    }
    if (!data.role || ![UserRole.LANDLORD, UserRole.TENANT].includes(data.role)) {
        throw new Error("Role must be either TENANT or LANDLORD");
    }
};


export const validateLoginInput = (data: any) => {
    if (!data.email || !data.email.includes("@")) {
        throw new Error("A valid email is required");
    }
    if (!data.password) {
        throw new Error("Password is required");
    }
};




