import { Router } from "express";
import { categoryController } from "./category.controller";






const routre = Router();


routre.post("/", categoryController.createCategory)
routre.get("/", categoryController.getAllCategory)






export const categoryRouter = routre;