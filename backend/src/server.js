import app from "./app.js";
import dotenv from 'dotenv'
import jwtVerification from "./auth.middleware.js";
import connectToDb from './connectToDb.js'
dotenv.config({
    path:'./.env'
});

const startServer = async () => {
    try {
        await connectToDb();
        app.listen(process.env.PORT, ()=> {
            console.log("Server is running on port 5000");
        });
    } catch (error) {
        console.log("Error occurred while connecting:", error);
    }
};

startServer();
