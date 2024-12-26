import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Heart, Share2, ShoppingCart, ChevronLeft } from 'lucide-react';
import { fetchProductDetail } from '../Redux/Action/productActions';
import BrandLogos from '../components/BrandLogos';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gender, categoryName, categoryId, productNameSlug, productId } = useParams();
  
  const { productDetail: product, fetchState: loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);

  const handleBack = () => {
    history.push(`/shop/${gender}/${categoryName}/${categoryId}`);
  };

  // Loading state
  if (loading === 'FETCHING') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (loading === 'FETCH_ERROR') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Hata!</p>
          <p>Ürün yüklenirken bir hata oluştu.</p>
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
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Geri Dön
        </button>

        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-gray-600">({product.rating})</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                Stok Durumu: <span className="font-semibold">{product.stock} adet</span>
              </p>
              <p className="text-gray-600">
                Satış: <span className="font-semibold">{product.sell_count} adet</span>
              </p>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Sepete Ekle
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="mt-16">
          <BrandLogos />
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
