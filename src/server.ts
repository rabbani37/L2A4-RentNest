import app from "./app";
import configIndex from "./config/config.index";
import "dotenv/config"
import prisma from "./lib/prisma";



async function main() {

    const PORT = configIndex.port

    try {
        await prisma.$connect()
        console.log(`Connected Database Successfully`);

        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`);

        })
    }
    catch (error) {

        console.log(`Starting the server`, error);
        await prisma.$disconnect();
        process.exit(1)
    }

};;

main()