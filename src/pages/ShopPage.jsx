import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import ReactPaginate from 'react-paginate';
import BrandLogos from "../components/BrandLogos";
import { setProductList, setTotal, setFetchState } from "../Redux/Action/productActions";
import axios from "axios";
import { getCategories } from "../redux/Action/categoryAction";

const ShopPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gender, categoryName, categoryId } = useParams();
  const { productList: products, total, fetchState: loading } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.categories);

  const [viewMode, setViewMode] = useState("grid");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 25;

  const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

  const sortOptions = [
    { value: "price:asc", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
    { value: "rating:asc", label: "Rating: Low to High" },
    { value: "rating:desc", label: "Rating: High to Low" }
  ];

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, sort, filter, categoryId]);

  const fetchProducts = async () => {
    try {
      dispatch(setFetchState("FETCHING"));
      const offset = currentPage * ITEMS_PER_PAGE;
      let url = `https://workintech-fe-ecommerce.onrender.com/products?limit=${ITEMS_PER_PAGE}&offset=${offset}`;
      
      // Add category parameter if exists
      if (categoryId) {
        url += `&category=${categoryId}`;
      }
      
      // Add sort parameter if exists
      if (sort) {
        url += `&sort=${sort}`;
      }
      
      // Add filter parameter if exists
      if (filter) {
        url += `&filter=${filter}`;
      }

      const response = await axios.get(url);
      dispatch(setProductList(response.data.products));
      dispatch(setTotal(response.data.total));
      dispatch(setFetchState("FETCHED"));
    } catch (error) {
      console.error("Error fetching products:", error);
      dispatch(setFetchState("FETCH_ERROR"));
    }
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(0); // Reset to first page when sort changes
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(0); // Reset to first page when filter changes
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  const handleCategoryClick = (category) => {
    const genderPath = category.gender === "k" ? "kadin" : "erkek";
    const categoryPath = category.code.split(":")[1];
    history.push(`/shop/${genderPath}/${categoryPath}/${category.id}`);
    setCurrentPage(0); // Reset to first page when category changes
  };

  const handleProductClick = (product) => {
    const productNameSlug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    history.push(`/shop/${gender}/${categoryName}/${categoryId}/${productNameSlug}/${product.id}`);
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
      {/* Filter and Sort Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter products..."
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded-md flex-1"
        />
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

      {/* Category Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories?.slice(0, 6).map((category) => (
          <div
            key={category.id}
            className="relative group overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <img
              src={category.img}
              alt={category.title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white transition-opacity group-hover:bg-opacity-50">
              <h3 className="text-2xl font-bold mb-2">{category.title.toUpperCase()}</h3>
              <p className="text-lg">{category.product_count || "5"} items</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
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

      {/* Products Grid */}
      <div
        className={`grid ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
        } gap-6 mb-8`}
      >
        {products?.map((product) => (
          <div
            key={product.id}
            className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
              viewMode === "list" ? "flex" : ""
            }`}
            onClick={() => handleProductClick(product)}
          >
            <div className={`relative group ${viewMode === "list" ? "w-1/3" : ""}`}>
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                <div className="transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <span className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-100">
                    Detayları Gör
                  </span>
                </div>
              </div>
            </div>
            <div className={`p-4 ${viewMode === "list" ? "w-2/3" : ""}`}>
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
              <p className={`text-gray-600 mb-3 text-sm ${viewMode === "list" ? "" : "line-clamp-2"}`}>
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
                <div className="text-sm text-gray-500">{product.stock} adet</div>
              </div>
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
