import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { PlusCircle, Search, Coffee, Pizza, IceCream, Beer } from 'lucide-react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { FiPlusCircle } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';


const categoryIcons = {
  'All': Pizza,
  'Appetizers': Coffee,
  'Main Course': Pizza,
  'Desserts': IceCream,
  'Beverages': Beer
};

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get('/foods');
        setFoods(res.data);
        setFilteredFoods(res.data);
      } catch (error) {
        toast.error('Failed to fetch menu');
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    const filtered = foods.filter((food) => {
      const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           food.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredFoods(filtered);
  }, [selectedCategory, searchQuery, foods]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl opacity-90">chalo Kuch Khaalo yaha se</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => {
                const Icon = categoryIcons[category];
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

     {/* Menu Grid */}
     <div className="container mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/food/${food._id}`)}
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{food.name}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{food.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-500">₹{food.price}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking the button
                  addToCart(food);
                  toast.success('Added to cart');
                }}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                <FiPlusCircle size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No items found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Menu;