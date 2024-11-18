import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ChefHat,
  Utensils,
  Leaf,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Instagram,
  Facebook,
  Twitter,
  Star,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Timer,
  Flame,
  Heart
} from "lucide-react";
import Map from '../components/Map';

const Home = () => {
  const [activeRegion, setActiveRegion] = useState('punjab');
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const regions = {
    punjab: {
      name: "Punjab",
      description: "Bold, rich flavors with abundant use of butter and cream",
      dishes: [
        {
          name: "Fix Punjabi Thali",
          price: "₹299",
          description: "Tender chicken in rich tomato-butter gravy",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKeOymz1rnKNZTK98bqneRvjL7unbh9FEqA&s",
          healthBenefits: "High in protein, calcium from dairy",
          spiceLevel: "Medium",
          prepTime: "30 mins",
          isVegetarian: false,
          rating: 4.8,
          reviews: 245
        },
        {
          name: "Panner Tikka Masala",
          price: "₹299",
          description: "Traditional mustard greens with makki roti",
          image: "https://carameltintedlife.com/wp-content/uploads/2020/02/Instant-Pot-Paneer-Tikka-Masala-18-480x270.jpg",
          healthBenefits: "Rich in iron, fiber, and vitamins",
          spiceLevel: "Mild",
          prepTime: "25 mins",
          isVegetarian: true,
          rating: 4.6,
          reviews: 180
        }
      ]
    },
    gujarat: {
      name: "Gujarat",
      description: "Sweet and spicy flavors with unique combinations",
      dishes: [
        {
          name: "Fix Kathiyawadi Thali",
          price: "₹199",
          description: "Steamed fermented rice and chickpea cake",
          image: "https://t4.ftcdn.net/jpg/06/21/24/03/360_F_621240378_7cKWVxCYnJ2egygunsBf1uCvQmzwvEZH.jpg",
          healthBenefits: "Protein-rich, probiotic benefits",
          spiceLevel: "Mild",
          prepTime: "20 mins",
          isVegetarian: true,
          rating: 4.7,
          reviews: 156
        },
        {
          name: "Sev tamatar",
          price: "₹349",
          description: "Mixed vegetable delicacy",
          image: "https://www.funfoodfrolic.com/wp-content/uploads/2024/06/sev-tamatar-ki-sabji-blog.jpg",
          healthBenefits: "Packed with seasonal vegetables and nutrients",
          spiceLevel: "Medium",
          prepTime: "45 mins",
          isVegetarian: true,
          rating: 4.9,
          reviews: 203
        }
      ]
    }
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Food Critic",
      comment: "The most authentic North Indian cuisine I've experienced outside of Punjab.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Vyas Vishal",
      role: "Food Blogger",
      comment: "Their fusion dishes perfectly balance traditional and modern flavors.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Rahul Verma",
      role: "Chef",
      comment: "The attention to detail in each dish is remarkable.",
      rating: 5,
      image: "/api/placeholder/64/64"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-orange-900/90" />
        <img
          src="https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/organizations/5d2656f1-9162-461d-88c7-b2505623d8cb/images/56YazJ2QB9A1TClJt7MkFQ.jpeg"
          alt=" "
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay transform scale-105"
        />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              A Journey Through
              <span className="block text-orange-400 mt-2">Indian Flavors</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Experience the rich tapestry of Indian cuisine, where each dish tells a story
              of tradition, culture, and passionate craftsmanship.
            </p>
            <div className="flex justify-center gap-6 mt-8">
              <button className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2">
                <Utensils className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="text-xl"
                onClick={() => navigate('/Menu')}
                >Explore Menu</span>
              </button>
              <button className="group bg-white/10 hover:bg-white/20 text-white border border-white/50 px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2">
                <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="text-xl"
                onClick={() => navigate('/Reservations')}
                >Book a Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: ChefHat,
                title: "Master Chefs",
                desc: "Culinary experts with decades of experience"
              },
              {
                icon: Leaf,
                title: "Fresh Ingredients",
                desc: "Sourced daily from local markets ensuring quality"
              },
              {
                icon: Heart,
                title: "Made with Love",
                desc: "Traditional recipes with modern innovation"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 hover:border-orange-200">
                <div className="text-orange-500 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Cuisine Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Regional Specialties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the diverse flavors of India through our carefully curated regional dishes
            </p>
          </div>

          <div className="flex justify-center mb-12 gap-4">
            {Object.keys(regions).map((region) => (
              <button
                key={region}
                className={`px-8 py-4 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  activeRegion === region
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white border border-gray-200 hover:border-orange-200 hover:shadow'
                }`}
                onClick={() => setActiveRegion(region)}
              >
                <span className="text-lg font-medium">{regions[region].name}</span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {regions[activeRegion].dishes.map((dish, idx) => (
              <div key={idx} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="md:flex">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {dish.isVegetarian && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full flex items-center gap-2">
                        <Leaf className="w-4 h-4" />
                        <span className="text-sm font-medium">Vegetarian</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:w-1/2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{dish.name}</h3>
                        <p className="text-gray-600">{dish.description}</p>
                      </div>
                      <span className="text-2xl font-bold text-orange-500">{dish.price}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="ml-1 font-medium text-gray-900">{dish.rating}</span>
                      </div>
                      <span className="text-gray-500">({dish.reviews} reviews)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-sm font-medium">Spice Level</p>
                          <p className="text-gray-600">{dish.spiceLevel}</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-2">
                        <Timer className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-sm font-medium">Prep Time</p>
                          <p className="text-gray-600">{dish.prepTime}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-green-800 text-sm">
                        <span className="font-semibold">Health Benefits:</span>{' '}
                        {dish.healthBenefits}
                      </p>
                    </div>

                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Utensils className="w-5 h-5" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Guests Say</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * 100}%)`
                }}
              >
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 p-8 rounded-2xl text-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
                      />
                      <p className="text-xl italic mb-6 text-gray-700">{testimonial.comment}</p>
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <h4 className="font-bold text-xl mb-1">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              onClick={() => setCurrentTestimonialIndex(prev => Math.max(0, prev - 1))}
              disabled={currentTestimonialIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              onClick={() => setCurrentTestimonialIndex(prev => Math.min(testimonials.length - 1, prev + 1))}
              disabled={currentTestimonialIndex === testimonials.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-green-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hours</h3>
              <p className="text-white/80">Mon-Sun: 04:00 PM - 02:00 AM</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Phone</h3>
              <p className="text-white/80">+91 8200192146</p>
              <p className="text-sm text-white/60 mt-2">Available during business hours</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-white/80">rajwen0807@gmail.com</p>
              <p className="text-sm text-white/60 mt-2">24/7 support available</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reservations</h3>
              <p className="text-white/80">Book online or call us</p>
              <button className="mt-4 px-6 py-2 border border-white/50 text-white hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto">
                <Calendar className="w-5 h-5" />
                <span
                onClick={() => navigate('/Reservations')}
                >
                  Reserve a Table</span>
              </button>
            </div>
          </div>

          <div className="mt-20 pt-16 border-t border-white/20">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6" />
                  <span>Location</span>
                </h3>
                <div className="bg-white/10 p-6 rounded-lg hover:bg-white/15 transition-colors">
                  <p className="mb-4">Shop no 14 Rajwen Happiness</p>
                  <p className="mb-4">Food Court PDPU,Road Raysan</p>
                  <p>Gandhinagar,Gujarat</p>
                  <button className="mt-6 bg-white text-green-900 hover:bg-white/90 px-6 py-3 rounded-lg transition-colors flex items-center gap-2 group">
                    <MapPin className="w-5 h-5 group-hover:animate-bounce" />
                    <span
                  
                    >
                      <a href="https://maps.app.goo.gl/mMAzPMtTevpMrWfGA">Get Directions</a></span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Map</h3>
               <Map/>
                  
                
              </div>
            </div>
          </div>

          <div className="mt-16 flex justify-center gap-6">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'Twitter' }
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="p-3 text-white hover:bg-white/10 rounded-full transition-all duration-300 group"
                aria-label={label}
              >
                <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="bg-orange-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Special Offers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our exclusive deals and seasonal promotions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Weekend Brunch",
                description: "Unlimited Indian breakfast favorites with live stations",
                price: "₹699 per person",
                timing: "Sat-Sun, 10:30 AM - 3:30 PM",
                image: "https://content.jdmagicbox.com/comp/def_content_category/brunch-restaurants/3-brunch-restaurants-3-7ehvh.jpg"
              },
              {
                title: "Family Feast",
                description: "Special thali with 12 items perfect for family dining",
                price: "₹1499 for two",
                timing: "Daily, 12:00 PM - 11:00 PM",
                image: "https://img.freepik.com/premium-photo/family-feast-festive-warm-scene-indian-family-enjoying-delicious-meal_734790-3978.jpg"
              },
              {
                title: "Corporate Lunch",
                description: "Quick service business lunch with daily changing menu",
                price: "₹449 per person",
                timing: "Mon-Fri, 12:00 PM - 3:00 PM",
                image: "https://media.istockphoto.com/id/1438213571/photo/new-business-agreement.jpg?s=612x612&w=0&k=20&c=QktBBABJs04agjHBS5xCodyjoDgqoho6wwQitJ8z66I="
              }
            ].map((offer, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{offer.title}</h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{offer.timing}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-orange-500 font-bold text-xl">{offer.price}</span>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2 group">
                    <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span
                    onClick={() => navigate('/Reservations')}
                    >Book Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;