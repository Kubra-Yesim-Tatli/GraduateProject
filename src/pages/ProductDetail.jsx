import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Heart, Share2, ShoppingCart, ChevronLeft } from 'lucide-react';
import { fetchProductDetail } from '../Redux/Action/productActions';
import { addToCart } from '../Redux/Action/cartActions';
import BrandLogos from '../components/BrandLogos';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gender, categoryName, categoryId, productNameSlug, productId } = useParams();
  
  const { productDetail: product, fetchState: loading } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);

  const handleBack = () => {
    history.push(`/shop/${gender}/${categoryName}/${categoryId}`);
  };

  const handleAddToCart = () => {
    if (product?.stock > 0) {
      dispatch(addToCart(product));
    }
  };

  const isProductInCart = () => {
    return cart.some(item => item.product.id === product?.id);
  };

  const getStockStatus = () => {
    if (!product?.stock) return { text: "Stokta Yok", color: "red" };
    if (product.stock <= 5) return { text: `Son ${product.stock} Ürün`, color: "orange" };
    return { text: "Stokta Mevcut", color: "green" };
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-star-gradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const stockStatus = getStockStatus();

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

  return (
    <main className="flex-grow">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Geri
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product?.images?.[0]?.url}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product?.images?.slice(1).map((image, index) => (
                <div key={index} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={`${product?.name} - ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-[#0891b2]">
                {product?.price} TL
              </span>
              {/* Stok Durumu */}
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-${stockStatus.color}-500`}>
                {stockStatus.text}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              {renderStars(product?.rating || 0)}
              <span className="text-gray-600 ml-2">
                ({product?.rating?.toFixed(1) || "0.0"})
              </span>
              {product?.review_count && (
                <span className="text-gray-500">
                  • {product.review_count} değerlendirme
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product?.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Beden</h3>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="w-12 h-12 border rounded-lg hover:border-[#0891b2] flex items-center justify-center"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.stock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg ${
                  product.stock ? 'bg-[#0891b2] hover:bg-[#0891b2]/90 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-500'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {isProductInCart() ? "Sepette" : "Sepete Ekle"}
              </button>
              <button className="w-12 h-12 border rounded-lg hover:border-[#0891b2] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 border rounded-lg hover:border-[#0891b2] flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 border-t pt-8">
              <h3 className="font-medium mb-4">Ürün Detayları</h3>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-32 text-gray-600">Kategori:</span>
                  <span>{product?.category?.name || 'Belirtilmemiş'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Stok Kodu:</span>
                  <span>{product?.id || 'Belirtilmemiş'}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Stok Durumu:</span>
                  <span className={`text-${stockStatus.color}-500`}>{stockStatus.text}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-gray-600">Puan:</span>
                  <div className="flex items-center gap-2">
                    {renderStars(product?.rating || 0)}
                    <span className="text-gray-600">
                      ({product?.rating?.toFixed(1) || "0.0"})
                    </span>
                  </div>
                </div>
              </div>
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
