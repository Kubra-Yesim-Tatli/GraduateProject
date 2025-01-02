import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">About Us</h1>
          
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                alt="Store"
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, Bandage has grown from a small local shop to a leading online fashion retailer. 
                We believe in making fashion accessible to everyone while maintaining the highest standards of quality.
              </p>
              <p className="text-gray-600">
                Our mission is to provide our customers with the latest fashion trends at affordable prices, 
                all while ensuring an exceptional shopping experience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We work with the best manufacturers to ensure our products meet the highest standards.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Style</h3>
              <p className="text-gray-600">
                Our team of fashion experts curates the latest trends for our collections.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Service</h3>
              <p className="text-gray-600">
                Customer satisfaction is our top priority, with 24/7 support available.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <h1 className="text-2xl font-bold mb-6">About Us</h1>
        
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="Store"
            className="w-full h-[250px] object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold mb-3">Our Story</h2>
          <p className="text-gray-600 mb-3">
            Founded in 2020, Bandage has grown from a small local shop to a leading online fashion retailer. 
            We believe in making fashion accessible to everyone while maintaining the highest standards of quality.
          </p>
          <p className="text-gray-600">
            Our mission is to provide our customers with the latest fashion trends at affordable prices, 
            all while ensuring an exceptional shopping experience.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quality</h3>
            <p className="text-gray-600">
              We work with the best manufacturers to ensure our products meet the highest standards.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Style</h3>
            <p className="text-gray-600">
              Our team of fashion experts curates the latest trends for our collections.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Service</h3>
            <p className="text-gray-600">
              Customer satisfaction is our top priority, with 24/7 support available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
