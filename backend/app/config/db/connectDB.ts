import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connectDB = async () => {
    try {
       
        await mongoose.connect(process.env.MONGO_DB_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;

