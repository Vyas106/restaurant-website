import React from 'react'
import { useNavigate } from 'react-router-dom'



const Footer = () => {
const Navigate = useNavigate();

  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Taste of India - Rajwen</h3>
              <p className="text-gray-400">
                Bringing authentic Indian flavors to your table from long time
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Menu', 'Reservations', 'Private Events', 'Gift Cards'].map((link) => (
                  <li key={link} >
                    <a  className="text-gray-400 hover:text-white transition-colors" onClick={() => Navigate(`/${link}`)}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Policies</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'FAQ'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {['instagram', 'facebook', 'twitter'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <div className="w-5 h-5 bg-gray-400 rounded-full" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Taste of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
