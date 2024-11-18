// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
            Rajven
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/menu" className="text-gray-700 hover:text-gray-600 font-medium">
              Menu
            </Link>

            {user && (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-gray-600 font-medium">
                  Orders
                </Link>

                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-gray-600 font-medium">
                    Admin
                  </Link>
                )}

                {/* Cart Icon */}
                <Link to="/cart" className="relative text-gray-700 hover:text-gray-600">
                  <FiShoppingCart size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </Link>

                {/* Logout Icon */}
                <button onClick={handleLogout} className="text-gray-700 hover:text-gray-600">
                  <FiLogOut size={20} />
                </button>
              </>
            )}

            {!user && (
              <Link to="/register" className="text-gray-700 hover:text-gray-600">
                <FiUser size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
