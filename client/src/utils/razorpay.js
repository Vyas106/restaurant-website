// First, add this script to your public/index.html
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

// Create a new file: src/utils/razorpay.js
export const initializeRazorpayPayment = async (orderData) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: "INR",
      name: "Your Restaurant Name",
      description: "Food Order Payment",
      order_id: orderData.razorpayOrderId,
      handler: function (response) {
        // This function will be called after successful payment
        return {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
      },
      prefill: {
        name: orderData.customerName,
        contact: orderData.contactNumber,
      },
      theme: {
        color: "#f97316", // orange-500 to match your theme
      },
    };
  
    return new Promise((resolve, reject) => {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on('payment.failed', function (response) {
        reject(response.error);
      });
    });
  };
  