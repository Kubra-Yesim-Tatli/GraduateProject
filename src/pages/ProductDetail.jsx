import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Heart, Share2, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/slider.css";
import ProductCard from '../components/ProductCard';
import BrandLogos from '../components/BrandLogos';

const ProductDetail = ({ match }) => {
  const { id } = match.params;
  const [selectedColor, setSelectedColor] = useState('blue');
  const [activeTab, setActiveTab] = useState('description');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Ürün verileri
  const products = [
    {
      id: 1,
      image: "/img/img1.jfif",
      title: "Classic Blue Jacket",
      rating: 4,
      reviews: 10,
      price: 1139.33,
      description: "Klasik kesim, modern detaylar. Su geçirmez kumaş ve çıkarılabilir astar ile her mevsim kullanım için ideal.",
      colors: [
        { name: 'Blue', class: 'bg-blue-500' },
        { name: 'Black', class: 'bg-black' }
      ]
    },
    {
      id: 2,
      image: "/img/img2.jfif",
      title: "Urban Street Coat",
      rating: 5,
      reviews: 15,
      price: 1299.99,
      description: "Şehir yaşamı için tasarlandı. Hafif ve dayanıklı kumaşı ile günlük kullanım için mükemmel.",
      colors: [
        { name: 'Green', class: 'bg-green-500' },
        { name: 'Orange', class: 'bg-orange-500' }
      ]
    },
    {
      id: 3,
      image: "/img/img3.jfif",
      title: "Winter Collection Parka",
      rating: 4.5,
      reviews: 8,
      price: 1599.99,
      description: "Kış ayları için özel tasarım. Yüksek yalıtım özelliği ve modern görünüm bir arada.",
      colors: [
        { name: 'Blue', class: 'bg-blue-500' },
        { name: 'Black', class: 'bg-black' },
        { name: 'Green', class: 'bg-green-500' }
      ]
    },
    {
      id: 4,
      image: "/img/img4.jfif",
      title: "Sport Performance Jacket",
      rating: 5,
      reviews: 12,
      price: 999.99,
      description: "Spor aktiviteleri için özel üretim. Nefes alabilen kumaş ve ergonomik tasarım.",
      colors: [
        { name: 'Orange', class: 'bg-orange-500' },
        { name: 'Blue', class: 'bg-blue-500' }
      ]
    }
  ];

  const currentProduct = products[currentSlide];

  // Yıldız oluşturma fonksiyonu
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400">
        {'★'.repeat(fullStars)}
        {hasHalfStar && '⯨'}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </div>
    );
  };

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={currentProduct.image}
                alt={currentProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {products.map((product, index) => (
                <button
                  key={index}
                  className={`rounded-lg overflow-hidden border-2 ${
                    currentSlide === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{currentProduct.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              {renderStars(currentProduct.rating)}
              <span className="text-gray-600">{currentProduct.reviews} Reviews</span>
            </div>
            <p className="text-2xl font-bold mb-6">${currentProduct.price.toFixed(2)}</p>
            <div className="mb-6">
              <p className="text-gray-600">
                {currentProduct.description}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="flex gap-2">
                {currentProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full ${color.class} ${
                      selectedColor === color.name.toLowerCase()
                        ? 'ring-2 ring-offset-2 ring-blue-500'
                        : ''
                    }`}
                    onClick={() => setSelectedColor(color.name.toLowerCase())}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              {['Description', 'Additional Information', 'Reviews'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.toLowerCase().replace(/\s+/g, '-')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(/\s+/g, '-'))}
                >
                  {tab} {tab === 'Reviews' && `(${currentProduct.reviews})`}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-xl font-bold mb-4">{currentProduct.title}</h2>
                <p className="text-gray-600 mb-4">
                  {currentProduct.description}
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600">• Premium kalite kumaş</p>
                  <p className="text-gray-600">• Modern kesim</p>
                  <p className="text-gray-600">• Dayanıklı malzeme</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bestseller Products Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">BESTSELLER PRODUCTS</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="flex flex-col space-y-4">
            {products.filter(p => p.id !== parseInt(id)).map((product) => (
              <div 
                key={product.id} 
                onClick={() => window.location.href = `/product/${product.id}`}
                className="cursor-pointer flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">Fashion</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through text-sm">
                        ${(product.price * 1.2).toFixed(2)}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(product.rating)}
                      {'☆'.repeat(5 - product.rating)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {['blue', 'black', 'green', 'orange'].map((color, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full bg-${color}-500`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Logos Section */}
        <div className="mt-16">
          <BrandLogos />
        </div>
      </div>
    </main>
  );
};

export default withRouter(ProductDetail);
