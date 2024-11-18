// index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import { foodRouter } from './routes/foodRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { userRouter } from './routes/userRoutes.js';
// import { paymentRouter } from './routes/paymentRoutes.js';
import { searchRouter } from './routes/searchRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/payments', paymentRouter);
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