
// routes/paymentRoutes.js
import express from 'express';
import Stripe from 'stripe';
import { Payment } from '../models/Payment.js';
import { auth } from '../middleware/auth.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-payment-intent', auth, async (req, res) => {
    try {
        const { amount, orderId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'inr',
            metadata: { orderId }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/record', auth, async (req, res) => {
    try {
        const payment = new Payment({
            ...req.body,
            status: 'completed'
        });
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export const paymentRouter = router;

