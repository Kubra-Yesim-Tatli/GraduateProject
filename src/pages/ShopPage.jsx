import React, { useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { 
  LayoutGrid, 
  List, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin 
} from 'lucide-react';
import BrandLogos from "../components/BrandLogos";

const categories = [
  { id: 1, name: "Cloths", items: 8, image: "/img/img1.jfif" },
  { id: 2, name: "Cloths", items: 5, image: "/img/img2.jfif" },
  { id: 3, name: "Cloths", items: 5, image: "/img/img3.jfif" },
  { id: 4, name: "Cloths", items: 5, image: "/img/img4.jfif" },
  { id: 5, name: "Cloths", items: 5, image: "/img/img5.jfif" },
];

const products = [
  { 
    title: "Graphic Design", 
    department: "English Department", 
    oldPrice: "$16.48", 
    newPrice: "$6.48",
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  { 
    title: "Graphic Design", 
    department: "English Department", 
    oldPrice: "$16.48", 
    newPrice: "$6.48",
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  { 
    title: "Graphic Design", 
    department: "English Department", 
    oldPrice: "$16.48", 
    newPrice: "$6.48",
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  { 
    title: "Graphic Design", 
    department: "English Department", 
    oldPrice: "$16.48", 
    newPrice: "$6.48",
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  { 
    title: "Graphic Design", 
    department: "English Department", 
    oldPrice: "$16.48", 
    newPrice: "$6.48",
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  { 
    title: "Graphic Design", 
    department: "English Department", 
    oldPrice: "$16.48", 
    newPrice: "$6.48",
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  { 
    title: "Graphic Design", 
    department: "English Department", 
    oldPrice: "$16.48", 
    newPrice: "$6.48",
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  },
  { 
    title: "Graphic Design", 
    department: "English Department", 
    oldPrice: "$16.48", 
    newPrice: "$6.48",
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  }
];

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products to show per page

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 py-8">
        <div className="flex flex-col space-y-12">
          {/* Shop Title and Breadcrumb */}
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Home</span>
              <span>&gt;</span>
              <span className="text-gray-900">Shop</span>
            </nav>
          </div>

          {/* Original Shop Categories Section */}
          <div className="flex flex-col space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group overflow-hidden rounded-lg shadow-md"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
                    <h3 className="text-lg font-bold uppercase">{category.name}</h3>
                    <p className="text-sm">{category.items} Items</p>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* New Shop Products Section */}
          <div className="flex flex-col space-y-8">
            {/* Shop Header with Results and Controls */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
              <div className="text-gray-600">
                Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} results
              </div>
              
              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Views:</span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors`}
                      aria-label="Grid view"
                    >
                      <LayoutGrid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500 transition-colors`}
                      aria-label="List view"
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:border-blue-500 focus:outline-none focus:border-blue-500"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>

                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Filter
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className={`${
              viewMode === 'grid'
                ? 'flex flex-wrap -mx-2'
                : 'flex flex-col space-y-4'
            }`}>
              {currentProducts.map((product, index) => (
                <div
                  key={index}
                  className={`${
                    viewMode === 'grid'
                      ? 'w-full sm:w-1/2 lg:w-1/4 p-2'
                      : 'w-full'
                  }`}
                >
                  <div className={`flex ${
                    viewMode === 'grid' ? 'flex-col' : 'flex-row'
                  } bg-white shadow-md rounded-lg overflow-hidden`}>
                    <div className={`relative ${viewMode === 'grid' ? 'w-full' : 'w-48'}`}>
                      <img
                        src={`/img/img${index + 4}.jfif`}
                        alt={product.title}
                        className="w-full h-full object-cover aspect-square"
                      />
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                        {product.colors.map((color, colorIndex) => (
                          <button
                            key={colorIndex}
                            className="w-4 h-4 rounded-full border border-white shadow-sm hover:scale-110 transition-transform"
                            style={{ backgroundColor: color }}
                            aria-label={`Select color ${colorIndex + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className={`flex flex-col ${
                      viewMode === 'grid' ? 'p-4' : 'p-6 flex-1'
                    }`}>
                      <h4 className="font-bold text-lg mb-1">{product.title}</h4>
                      <p className="text-gray-500 mb-2">{product.department}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through">{product.oldPrice}</span>
                        <span className="text-green-600 font-bold">{product.newPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                <button 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                  }`}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                
                {getPageNumbers().map(number => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === number
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
      <BrandLogos />
      <Footer />
    </div>
  );
};

export default ShopPage;
