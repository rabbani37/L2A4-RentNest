import dotenv from "dotenv"
import path from "path"

const rootPath = process.cwd()
dotenv.config({ path: path.join(rootPath, ".env") });


export default {
    port: process.env.PORT || 3000,
    database_url: process.env.DATABASE_URL!,
    app_url: process.env.APP_URL!,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS!,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET!,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
    token_access_expaired: process.env.TOKEN_ACCESS_EXPAIRED!,
    token_refresh_expaired: process.env.TOKEN_REFRESH_EXPAIRED!,

}