import express, { Application, Request, Response } from "express"
import cors from "cors"
import configIndex from "./config/config.index"
import cookieParser from "cookie-parser"
import { userRouter } from "./modules/user/user.router"


const app: Application = express()




//middleware
app.use(cors({
  origin: configIndex.app_url,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




app.use("/api/auth", userRouter)


app.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Welcome to RentNest Backend!" })
});





export default app;