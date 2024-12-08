import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import { foodRouter } from './routes/foodRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import { searchRouter } from './routes/searchRoutes.js';
import path from 'path';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// API Routes
app.use('/api/search', searchRouter);
app.use('/api/foods', foodRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
