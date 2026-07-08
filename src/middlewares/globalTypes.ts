import { UserRole } from "../../generated/prisma/enums";

interface IUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
};

declare global {
    namespace Express {
        interface Request {
            presentUser?: IUser;
        }
    }
};

