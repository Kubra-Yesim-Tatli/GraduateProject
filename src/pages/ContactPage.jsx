import React, { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      content: '(225) 555-0118',
      link: 'tel:(225)555-0118'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      content: 'contact@bandage.com',
      link: 'mailto:contact@bandage.com'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Address',
      content: '2715 Ash Dr. San Jose, South Dakota 83475',
      link: 'https://maps.google.com/?q=2715+Ash+Dr.+San+Jose,+South+Dakota+83475'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <h1 className="text-3xl font-bold mb-12 text-center">Contact Us</h1>
        
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0891b2] focus:border-[#0891b2]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0891b2] focus:border-[#0891b2]"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0891b2] focus:border-[#0891b2]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0891b2] text-white py-2 px-4 rounded-md hover:bg-[#0891b2]/90"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 text-gray-600 hover:text-[#0891b2]"
                >
                  <div className="text-[#0891b2]">{info.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{info.title}</h3>
                    <p>{info.content}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="space-y-8">
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-4 text-gray-600 hover:text-[#0891b2]"
              >
                <div className="text-[#0891b2]">{info.icon}</div>
                <div>
                  <h3 className="font-medium text-gray-900">{info.title}</h3>
                  <p>{info.content}</p>
                </div>
              </a>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="mobile-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="mobile-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0891b2] focus:border-[#0891b2]"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="mobile-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0891b2] focus:border-[#0891b2]"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="mobile-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#0891b2] focus:border-[#0891b2]"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0891b2] text-white py-2 px-4 rounded-md hover:bg-[#0891b2]/90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
