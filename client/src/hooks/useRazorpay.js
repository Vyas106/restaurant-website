// src/hooks/useRazorpay.js
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useRazorpay = () => {
  const [paymentLoading, setPaymentLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async ({
    amount,
    currency = 'INR',
    customerName,
    customerEmail,
    customerPhone,
    orderId,
  }) => {
    try {
      setPaymentLoading(true);
      
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Use VITE_ prefix for Vite projects
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        name: 'Your Restaurant Name',
        description: 'Food Order Payment',
        order_id: orderId,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#f97316',
        },
        handler: function (response) {
          return {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      return new Promise((resolve, reject) => {
        paymentObject.on('payment.success', function (response) {
          resolve(response);
        });
        
        paymentObject.on('payment.error', function (error) {
          reject(error);
        });
      });
    } catch (error) {
      toast.error('Payment initialization failed');
      throw error;
    } finally {
      setPaymentLoading(false);
    }
  };

  return {
    initiatePayment,
    paymentLoading,
  };
};