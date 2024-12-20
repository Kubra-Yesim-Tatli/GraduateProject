import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Heart, Share2, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
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
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://workintech-fe-ecommerce.onrender.com/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Ürün yüklenirken bir hata oluştu.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Hata!</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p className="font-bold">Ürün Bulunamadı</p>
          <p>İstediğiniz ürün bulunamadı veya kaldırılmış olabilir.</p>
        </div>
      </div>
    );
  }

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
                src={product.images[currentSlide]?.url}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      currentSlide === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">{product.sell_count} satış</span>
            </div>

            <div className="text-2xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-600 mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <div className="font-semibold mb-2">Stok Durumu:</div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{product.stock > 0 ? `${product.stock} adet stokta` : 'Stokta yok'}</span>
              </div>
            </div>

            {product.stock > 0 && (
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart size={20} />
                  <span>Sepete Ekle</span>
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ürün Açıklaması
              </button>
              <button
                onClick={() => setActiveTab('additional')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'additional'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ek Bilgiler
              </button>
            </nav>
          </div>
          <div className="py-6">
            {activeTab === 'description' ? (
              <div className="prose max-w-none">
                <p>{product.description}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Ürün Detayları</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Ürün ID: {product.id}</li>
                    <li>Stok: {product.stock}</li>
                    <li>Satış: {product.sell_count}</li>
                    <li>Puan: {product.rating.toFixed(1)}</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default withRouter(ProductDetail);
