import dotenv from "dotenv"
import path from "path"

const rootPath = process.cwd()
dotenv.config({ path: path.join(rootPath, ".env") });


export default {
    port: process.env.PORT || 3000,
    database_url: process.env.DATABASE_URL,
    app_url: process.env.APP_URL,
}