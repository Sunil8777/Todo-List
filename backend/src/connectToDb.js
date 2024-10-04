import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
});

const connectToDb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/test`);
        console.log("Database connected successfully");
    } catch (error) {
        console.log(`problem occur while connecting database ${process.env.MONGO_URL}`,error);
    }
}

export default connectToDb;
