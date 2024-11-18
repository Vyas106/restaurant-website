import React, { useState, useEffect } from 'react';
import { Clock, Package, Truck, Check, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api/axios';

const OrderStatusStep = ({ status, currentStatus, icon: Icon, label }) => {
  const isCompleted = ['pending', 'preparing', 'out_for_delivery', 'delivered'].indexOf(currentStatus) >= 
    ['pending', 'preparing', 'out_for_delivery', 'delivered'].indexOf(status);

  return (
    <div className="flex flex-col items-center">
      <div className={`rounded-full p-3 ${
        isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className={`mt-2 text-sm ${isCompleted ? 'text-green-600 font-medium' : 'text-gray-400'}`}>
        {label}
      </p>
    </div>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/my-orders');
        setOrders(res.data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter(order => {
      if (selectedFilter === 'all') return true;
      return order.status === selectedFilter;
    })
    .filter(order =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.food.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const getDeliveryQuote = () => {
    const quotes = [
      "Your food journey is our priority! 🚀",
      "Happiness is on the way! 🎉",
      "Great food coming right up! 👨‍🍳",
      "Your taste buds will thank you! 😋",
      "We're cooking up something special! ✨"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">{getDeliveryQuote()}</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedFilter === filter
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-yellow-800">
          No orders found. Time to treat yourself to something delicious! 🍽️
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Order #{order._id.slice(-6)}</h3>
                        <p className="text-sm text-gray-600">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>

                    {order.status !== 'cancelled' && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <OrderStatusStep status="pending" currentStatus={order.status} icon={Clock} label="Confirmed" />
                          <div className="flex-1 h-1 mx-2 bg-gray-200">
                            <div className={`h-full bg-green-500 transition-all duration-500 ${
                              order.status === 'pending' ? 'w-0' :
                              order.status === 'preparing' ? 'w-1/3' :
                              order.status === 'out_for_delivery' ? 'w-2/3' :
                              'w-full'
                            }`} />
                          </div>
                          <OrderStatusStep status="preparing" currentStatus={order.status} icon={Package} label="Preparing" />
                          <div className="flex-1 h-1 mx-2 bg-gray-200">
                            <div className={`h-full bg-green-500 transition-all duration-500 ${
                              ['pending', 'preparing'].includes(order.status) ? 'w-0' :
                              order.status === 'out_for_delivery' ? 'w-1/2' :
                              'w-full'
                            }`} />
                          </div>
                          <OrderStatusStep status="out_for_delivery" currentStatus={order.status} icon={Truck} label="On the way" />
                          <div className="flex-1 h-1 mx-2 bg-gray-200">
                            <div className={`h-full bg-green-500 transition-all duration-500 ${
                              order.status === 'delivered' ? 'w-full' : 'w-0'
                            }`} />
                          </div>
                          <OrderStatusStep status="delivered" currentStatus={order.status} icon={Check} label="Delivered" />
                        </div>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Order Items</h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item._id} className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                                🍽️
                              </div>
                              <div>
                                <p className="font-medium">{item.food.name}</p>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="font-medium">₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-72 flex flex-col">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Order Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>₹{order.totalAmount - 40}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Delivery Fee</span>
                          <span>₹40</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{order.totalAmount}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">Delivery Details</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600 flex items-start">
                          <span className="mr-2">📍</span>
                          <span>{order.deliveryAddress}</span>
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <span className="mr-2">📞</span>
                          <span>{order.contactNumber}</span>
                        </p>
                      </div>
                    </div>

                    <button 
                      className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                      onClick={() => {
                        // Handle reorder functionality
                        toast.success('Reorder feature coming soon!');
                      }}
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;