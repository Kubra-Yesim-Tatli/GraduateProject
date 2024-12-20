import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LayoutGrid, List } from "lucide-react";
import BrandLogos from "../components/BrandLogos";
import { setProductList, setTotal, setFetchState } from '../Redux/Action/productActions';
import { getCategories } from '../Redux/Action/categoryAction';
import axios from 'axios';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { productList: products, total, fetchState: loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.categories);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setFetchState('FETCHING'));
        const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/products');
        dispatch(setProductList(response.data.products));
        dispatch(setTotal(response.data.total));
        dispatch(setFetchState('FETCHED'));
      } catch (error) {
        console.error('Error fetching products:', error);
        dispatch(setFetchState('FETCH_ERROR'));
      }
    };

    fetchProducts();
    dispatch(getCategories());
  }, [dispatch]);

  if (loading === 'FETCHING') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (loading === 'FETCH_ERROR') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Hata!</p>
          <p>Veriler yüklenirken bir hata oluştu.</p>
        </div>
      </div>
    );
  }

  // Calculate total pages
  const totalPages = Math.ceil(products?.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories?.slice(0, 6).map((category) => (
          <Link
            key={category.id}
            to={`/shop/${category.gender === 'k' ? 'kadin' : 'erkek'}/${category.code.split(':')[1]}`}
            className="relative group overflow-hidden rounded-lg aspect-[4/3]"
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white transition-opacity group-hover:bg-opacity-50">
              <h3 className="text-2xl font-bold mb-2">{category.title.toUpperCase()}</h3>
              <p className="text-lg">{category.product_count || '5'} items</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ürünler</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
            >
              <List size={20} />
            </button>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded p-2"
          >
            <option value="popularity">Popülerlik</option>
            <option value="price-low">Fiyat: Düşükten Yükseğe</option>
            <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
            <option value="rating">Değerlendirme</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
        {currentProducts?.map((product) => (
          <div key={product.id} className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
            <div className={`relative group ${viewMode === 'list' ? 'w-1/3' : ''}`}>
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                <div className="transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100"
                  >
                    Detayları Gör
                  </Link>
                </div>
              </div>
            </div>
            <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
              <p className={`text-gray-600 mb-3 text-sm ${viewMode === 'list' ? '' : 'line-clamp-2'}`}>
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-blue-600">${product.price}</span>
                  {product.rating > 0 && (
                    <div className="flex items-center text-yellow-400">
                      <span>★</span>
                      <span className="ml-1 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {product.stock} adet
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Brand Logos */}
      <BrandLogos />
    </div>
  );
};

export default ShopPage;
