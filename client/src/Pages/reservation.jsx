import React from 'react';
import { Clock, Mail, Menu, UserPlus, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';




const Reservation = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Online Reservations Coming Soon!
          </h1>
          <p className="text-gray-600">
            We're excited to announce that we've just launched our online services
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="bg-orange-50 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <Bell className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-semibold text-gray-800 mb-2">
                  Stay Updated!
                </h2>
                <p className="text-gray-600">
                  We'll notify you via email when our online reservation system becomes available. Create an account to be the first to know!
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-xl hover:border-orange-200 transition-colors" 
            onClick={() => navigate('/register')}
            >
              <UserPlus className="w-6 h-6 text-orange-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Create Account</h3>
              <p className="text-gray-600 text-sm">
                Sign up now to access exclusive features and updates
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-xl hover:border-orange-200 transition-colors" 
            onClick={() => navigate('/menu')}
            >
              <Menu className="w-6 h-6 text-orange-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Explore Menu</h3>
              <p className="text-gray-600 text-sm">
                Browse our delicious offerings while you wait
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center pt-6">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-colors mb-4"
            onClick={() => navigate('/register')} 
            >
              Create Account
            </button>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              <span>We'll notify you when reservations are available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;