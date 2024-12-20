import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BrandLogos from "../components/BrandLogos";

const CategoryPage = () => {
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getGenderText = (gender) => {
    return gender === 'k' ? 'kadin' : gender === 'e' ? 'erkek' : '';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Kategoriler</h1>
      
      {/* Kadın Kategorileri */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Kadın</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.filter(cat => cat.gender === 'k').map((category) => (
            <Link
              key={category.id}
              to={`/shop/${getGenderText(category.gender)}/${category.code.split(':')[1]}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-40 object-cover transform transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg">{category.title}</h3>
                    {category.rating && (
                      <div className="text-yellow-400 mt-1">
                        <span>★</span>
                        <span className="ml-1">{category.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Erkek Kategorileri */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Erkek</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.filter(cat => cat.gender === 'e').map((category) => (
            <Link
              key={category.id}
              to={`/shop/${getGenderText(category.gender)}/${category.code.split(':')[1]}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-40 object-cover transform transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg">{category.title}</h3>
                    {category.rating && (
                      <div className="text-yellow-400 mt-1">
                        <span>★</span>
                        <span className="ml-1">{category.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Brand Logos */}
      <div className="mt-12">
        <BrandLogos />
      </div>
    </div>
  );
};

export default CategoryPage;
