import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRazorpay } from '../hooks/useRazorpay';
import api from '../api/axios';

import { 
  MapPin, 
  Phone, 
  Trash2, 
  Plus, 
  Minus,
  ShoppingBag,
  CreditCard,
  IndianRupee
} from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const { user } = useAuth();
  const { initiatePayment } = useRazorpay();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  const deliveryFee = 40;
  const tax = Math.round(total * 0.005);
  const finalTotal = total + deliveryFee + tax;

  const handleOrderSubmit = async () => {
    if (!user) {
      alert('Please login to continue with your order');
      navigate('/login');
      return;
    }
    
    if (!address || !contactNumber || !paymentMethod) {
      alert('Please fill in all required details including payment method');
      return;
    }

    setLoading(true);
    try {
      if (paymentMethod === 'cod') {
        // Handle Cash on Delivery
        const orderData = {
          items: cart.map(item => ({
            food: item.food._id,
            quantity: item.quantity,
            price: item.food.price
          })),
          totalAmount: finalTotal,
          deliveryAddress: address,
          contactNumber,
          paymentMethod: 'cod',
          paymentStatus: 'pending'
        };

        await api.post('/orders', orderData);
        clearCart();
        alert('Order placed successfully! Your food is being prepared.');
        navigate('/orders');
      } else {
        // Handle Online Payment
        const createOrderResponse = await api.post('/payment/create-order', {
          amount: finalTotal,
        });

        const paymentResponse = await initiatePayment({
          amount: finalTotal,
          customerName: user.name,
          customerEmail: user.email,
          customerPhone: contactNumber,
          orderId: createOrderResponse.data.id,
        });

        const verificationResponse = await api.post('/payment/verify-payment', {
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
        });

        if (verificationResponse.data.verified) {
          const orderData = {
            items: cart.map(item => ({
              food: item.food._id,
              quantity: item.quantity,
              price: item.food.price
            })),
            totalAmount: finalTotal,
            deliveryAddress: address,
            contactNumber,
            paymentMethod: 'online',
            paymentStatus: 'completed',
            paymentId: paymentResponse.razorpay_payment_id,
            orderId: paymentResponse.razorpay_order_id
          };

          await api.post('/orders', orderData);
          clearCart();
          alert('Payment successful! Order placed successfully.');
          navigate('/orders');
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add items from the menu to start your order</p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            {cart.map((item) => (
              <div key={item.food._id} className="flex items-center gap-4 py-4 border-b last:border-0">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src={item.food.image || '/api/placeholder/64/64'} 
                    alt={item.food.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{item.food.name}</h3>
                  <p className="text-gray-500 text-sm">₹{item.food.price}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.food._id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.food._id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.food._id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Details */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Delivery & Payment</h2>
            
            {/* Delivery Details */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Delivery Address
                </label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows="3"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete delivery address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Select Payment Method</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod('online')}
                  className={`w-full flex items-center gap-3 p-4 border rounded-lg ${
                    paymentMethod === 'online' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Pay Online</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full flex items-center gap-3 p-4 border rounded-lg ${
                    paymentMethod === 'cod' 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <IndianRupee className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-3 py-4 border-t border-b">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 font-bold text-lg">
              <span>Total Amount</span>
              <span>₹{finalTotal}</span>
            </div>

            <button
              onClick={handleOrderSubmit}
              disabled={loading || !paymentMethod}
              className="w-full bg-orange-500 text-white p-4 rounded-lg font-medium hover:bg-orange-600 
                        disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : `Place Order${paymentMethod === 'cod' ? ' (COD)' : ''}`}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;