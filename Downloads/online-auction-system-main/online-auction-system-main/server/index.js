import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config();
import { connectDB } from './connection.js'
import auctionRouter from './routes/auction.js';
import { secureRoute } from './middleware/auth.js';
import userAuthRouter from './routes/userAuth.js';
import userRouter from './routes/user.js';
import contactRouter from "./routes/contact.js";
import adminRouter from './routes/admin.js';

const port = process.env.PORT || 4000;

const app = express();
app.use(cookieParser());
app.use(express.json());
// Allow origin from environment or common Vite dev host(s)
const allowedOrigins = [process.env.ORIGIN, 'http://localhost:5173', 'http://localhost:5174'].filter(Boolean);
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin like mobile apps or curl
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));


app.get('/', async (req, res) => {
    res.json({ msg: 'Welcome to Online Auction System API' });
});
app.use('/auth', userAuthRouter)
app.use('/user', secureRoute, userRouter)
app.use('/auction', secureRoute, auctionRouter);
app.use('/contact', contactRouter);
app.use('/admin', secureRoute, adminRouter)

// Start the server after attempting DB connection. In development we'll still
// start the server even if DB connection fails so frontend work can continue.
const startServer = async () => {
    try {
        await connectDB();
        console.log('Database connection established');
    } catch (err) {
        console.error('Failed to establish database connection:', err && err.message ? err.message : err);
        if (process.env.NODE_ENV === 'production') {
            console.error('Exiting because DB connection failed in production.');
            process.exit(1);
        } else {
            console.warn('Continuing to start server in development despite DB connection failure.');
        }
    }

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason && reason.message ? reason.message : reason);
});