import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            return;
        }
        
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL environment variable is not defined');
        }
        // Try connecting to the configured MongoDB (Atlas)
        try {
            await mongoose.connect(process.env.MONGO_URL, {
                // modern mongoose uses sensible defaults; set a reasonable timeout
                serverSelectionTimeoutMS: 10000,
                socketTimeoutMS: 45000,
            });
            console.log('Connected to MongoDB (MONGO_URL)');
            return;
        } catch (atlasErr) {
            console.error('Primary MongoDB connection failed:', atlasErr.message);

            // If running in development, attempt a local MongoDB fallback to make development easier
            if (process.env.NODE_ENV !== 'production') {
                const localUrl = process.env.LOCAL_MONGO_URL || 'mongodb://127.0.0.1:27017/auction';
                console.log(`Attempting fallback to local MongoDB at ${localUrl}`);
                await mongoose.connect(localUrl, {
                    serverSelectionTimeoutMS: 10000,
                    socketTimeoutMS: 45000,
                });
                console.log('Connected to local MongoDB fallback');
                return;
            }

            // In production or if fallback not used, rethrow the original error
            throw atlasErr;
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error && error.message ? error.message : error);
        console.error('Common causes: wrong connection string, network issues, or Atlas IP whitelist blocking your IP.');
        console.error('If using MongoDB Atlas, add your IP (or 0.0.0.0/0 for development) under Network Access -> IP access list.');
        throw error;
    }
}