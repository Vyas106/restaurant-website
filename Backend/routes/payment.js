
  // Backend API endpoint (create in your backend)
  // routes/payment.js
  const express = require('express');
  const router = express.Router();
  const Razorpay = require('razorpay');
  
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  
  router.post('/create-order', async (req, res) => {
    try {
      const options = {
        amount: req.body.amount * 100, // Razorpay expects amount in paise
        currency: "INR",
        receipt: `order_${Date.now()}`,
      };
  
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error creating Razorpay order" });
    }
  });
  
  router.post('/verify-payment', async (req, res) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;
  
    const sha = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    const digest = sha.update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
  
    if (digest === razorpay_signature) {
      res.json({ verified: true });
    } else {
      res.status(400).json({ verified: false });
    }
  });
  
  module.exports = router;