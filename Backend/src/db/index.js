import mongoose from "mongoose";
const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/elegant`)
        console.log(`\nMongoDB connected!!!`);
    } catch (error) {
        console.log('MONGODB connection error', error);
        process.exit(1)
    }
}

export default connectDB;