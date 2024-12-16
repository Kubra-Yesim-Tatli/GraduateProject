import React from "react";
import { Link } from "react-router-dom"; // Link bileşenini import ettik

const Footer = () => {
  const companyInfo = ["About Us", "Carrier", "We are hiring", "Blog"];
  const legal = ["Terms & Conditions", "Privacy Policy"];
  const features = ["Business Marketing", "User Analytic", "Live Chat", "Unlimited Support"];
  const resources = ["IOS & Android", "Watch a Demo", "Customers", "API"];

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        {/* Sosyal Medya İkonları */}
        <div className="flex justify-center mb-6 space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
        </div>

        {/* Menü Kısımları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-4">Company Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {companyInfo.map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {legal.map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {features.map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {resources.map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* E-posta Aboneliği */}
        <div className="text-center mb-6">
          <h3 className="font-semibold mb-2">Get In Touch</h3>
          <div className="flex justify-center items-center">
            <input
              type="email"
              placeholder="Your Email"
              className="w-2/3 sm:w-1/3 p-3 text-gray-900 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="text-center text-sm text-gray-400">
          <p>Made With Love By Finland All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
