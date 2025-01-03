import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import ReactPaginate from 'react-paginate';
import BrandLogos from "../components/BrandLogos";
import { setProductList, setTotal, setFetchState } from "../Redux/Action/productActions";
import { getCategories } from "../redux/Action/categoryAction";
import { addToCart } from "../Redux/Action/cartActions";
import axiosInstance from '../api/axiosInstance';

const ShopPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gender, categoryName, categoryId } = useParams();
  const { productList: products, total, fetchState: loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.categories);
  const { cart } = useSelector((state) => state.cart);

  const [viewMode, setViewMode] = useState("grid");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [filterType, setFilterType] = useState("name");
  const [currentPage, setCurrentPage] = useState(0);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const ITEMS_PER_PAGE = 25;

  const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

  const sortOptions = [
    { value: "price:asc", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
    { value: "rating:asc", label: "Rating: Low to High" },
    { value: "rating:desc", label: "Rating: High to Low" }
  ];

  // Kategorileri erkek/kadın olarak grupla
  const groupedCategories = useMemo(() => {
    if (!categories) return { men: [], women: [], popular: [] };
    
    // Tüm kategorileri birleştir ve rating'e göre sırala
    const allCategories = [...categories].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    const popularCategories = allCategories.slice(0, 5);

    return categories.reduce((acc, category) => {
      if (category.gender === "e") {
        acc.men.push(category);
      } else if (category.gender === "k") {
        acc.women.push(category);
      }
      acc.popular = popularCategories;
      return acc;
    }, { men: [], women: [], popular: [] });
  }, [categories]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Her kategori için ürün sayısını çek
  useEffect(() => {
    const fetchCategoryProducts = async (categoryId) => {
      try {
        const response = await axiosInstance.get(`/products?category=${categoryId}`);
        setCategoryProducts(prev => ({
          ...prev,
          [categoryId]: response.data.total
        }));
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    if (categories) {
      categories.forEach(category => {
        fetchCategoryProducts(category.id);
      });
    }
  }, [categories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500); // 500ms bekle

    return () => clearTimeout(timer);
  }, [filter]);

  useEffect(() => {
    if (debouncedFilter !== filter) {
      setCurrentPage(0);
    }
    fetchProducts();
  }, [currentPage, sort, debouncedFilter, categoryId]);

  const fetchProducts = async () => {
    try {
      dispatch(setFetchState("FETCHING"));
      let url = `/api/products?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
      
      // Sıralama parametresi varsa ekle
      if (sort) {
        url += `&sort=${sort}`;
      }
      
      // Kategori ID'si varsa ekle
      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }
      
      // Filtreleme parametresi varsa ekle
      if (debouncedFilter) {
        url += `&filter=${debouncedFilter}&filterType=${filterType}`;
      }

      const response = await axiosInstance.get(url);
      dispatch(setProductList(response.data));
      dispatch(setTotal(response.data.total));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(setFetchState("ERROR"));
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(0); // Reset to first page when sort changes
  };

  const handleFilterTypeChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    setFilter(""); // Reset filter when type changes
    setCurrentPage(0);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const handleCategoryClick = (category) => {
    const genderPath = category.gender === "k" ? "kadin" : "erkek";
    const categoryPath = category.code.split(":")[1];
    history.push(`/shop/${genderPath}/${categoryPath}/${category.id}`);
    setCurrentPage(0); // Kategori değiştiğinde ilk sayfaya dön
  };

  const handleProductClick = (product) => {
    const productNameSlug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const genderPath = gender || (product.gender === "k" ? "kadin" : "erkek");
    const categoryPath = categoryName || product.category?.code?.split(":")[1] || "kategori";
    const catId = categoryId || product.category?.id || "0";
    
    history.push(`/shop/${genderPath}/${categoryPath}/${catId}/${productNameSlug}/${product.id}`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Ürün detayına gitmesini engelle
    dispatch(addToCart(product));
  };

  const isProductInCart = (productId) => {
    return cart.some(item => item.product.id === productId);
  };

  if (loading === "FETCHING") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (loading === "FETCH_ERROR") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Hata!</p>
          <p>Veriler yüklenirken bir hata oluştu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Banners */}
      <div className="space-y-12 mb-12">
        {/* En Popüler Kategoriler */}
        <div>
          <h2 className="text-2xl font-bold mb-6">En Popüler Kategoriler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedCategories.popular.map((category) => (
              <div
                key={category.id}
                className="relative group overflow-hidden rounded-lg aspect-[4/3] cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  src={category.img || `https://source.unsplash.com/400x400/?${category.name}`}
                  alt={category.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <div className="flex items-center gap-4">
                    <p className="text-lg">
                      <span className="font-semibold">{categoryProducts[category.id] || 0}</span> ürün
                    </p>
                    {category.rating && (
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1">{category.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Ürünler</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-200" : ""}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-gray-200" : ""}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <select
              value={filterType}
              onChange={(e) => handleFilterTypeChange(e)}
              className="p-2 border rounded-md w-32"
            >
              <option value="name">İsim</option>
              <option value="color">Renk</option>
              <option value="size">Beden</option>
              <option value="gender">Cinsiyet</option>
              <option value="fabric">Kumaş</option>
            </select>
            <input
              type="text"
              placeholder={`${filterType === 'name' ? 'Ürün adına göre ara...' : 
                          filterType === 'color' ? 'Renge göre ara...' :
                          filterType === 'size' ? 'Bedene göre ara...' :
                          filterType === 'gender' ? 'Cinsiyete göre ara...' :
                          'Kumaş türüne göre ara...'}`}
              value={filter}
              onChange={handleFilterChange}
              className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={sort}
            onChange={handleSortChange}
            className="p-2 border rounded-md"
          >
            <option value="">Sort by...</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
        {products?.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${
              viewMode === "list" ? "flex" : ""
            }`}
            onClick={() => handleProductClick(product)}
          >
            <div className={`relative ${viewMode === "list" ? "w-48" : "w-full"}`}>
              <img
                src={product.images[0]?.url || `https://source.unsplash.com/400x400/?${product.name}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                  {product.discount}% İndirim
                </div>
              )}
              <div className="absolute bottom-2 right-2 flex items-center bg-black/50 text-white px-2 py-1 rounded">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${
                        star <= (product.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm">{product.rating ? product.rating.toFixed(1) : '0.0'}</span>
              </div>
            </div>
            <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xl font-bold text-primary">
                    {product.price.toFixed(2)} TL
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {(product.price / (1 - product.discount / 100)).toFixed(2)} TL
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName={"flex justify-center gap-2 my-8"}
          pageClassName={"border rounded px-3 py-1 hover:bg-gray-100"}
          previousClassName={"border rounded px-3 py-1 hover:bg-gray-100"}
          nextClassName={"border rounded px-3 py-1 hover:bg-gray-100"}
          activeClassName={"bg-blue-500 text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      )}

      {/* Brand Logos */}
      <BrandLogos />
    </div>
  );
};

export default ShopPage;
