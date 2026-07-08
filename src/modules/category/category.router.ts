import { Router } from "express";
import { categoryController } from "./category.controller";
import authRole from "../../middlewares/authRole";
import { UserRole } from "../../../generated/prisma/enums";





const routre = Router();


routre.post("/",authRole(UserRole.ADMIN), categoryController.createCategory)
routre.get("/", categoryController.getAllCategory)






export const categoryRouter = routre;