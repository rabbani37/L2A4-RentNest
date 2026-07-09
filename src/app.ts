import express, { Application, Request, Response } from "express"
import cors from "cors"
import configIndex from "./config/config.index"
import cookieParser from "cookie-parser"
import { authRouter } from "./modules/auth/auth.router"
import { notFound } from "./middlewares/notFound"
import { globalErrorHandler } from "./middlewares/globalErrorHandler"
import { propertyRouter } from "./modules/property/property.router"
import { categoryRouter } from "./modules/category/category.router"
import { rentalRequestRouter } from "./modules/rentalRequest/rentalRequest.router"
import { reviewRouter } from "./modules/review/review.router"
import { adminRouter } from "./modules/adminAPI/admin.router"


const app: Application = express()




//middleware
app.use(cors({
  origin: configIndex.app_url,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.use("/api/auth", authRouter) // Public and ADMIN
app.use("/api/categories", categoryRouter)
app.use("/api/landlord", propertyRouter)
app.use("/api/properties", propertyRouter) // Public API
app.use("/api/rentals", rentalRequestRouter);
app.use("/api/reviews", reviewRouter)

app.use("/api/admin", adminRouter)





app.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Welcome to RentNest Backend!" })
});






app.use(notFound)
app.use(globalErrorHandler)

export default app;