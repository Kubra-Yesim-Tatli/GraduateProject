import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { categories } = useSelector((state) => state.categories);

    const getGenderText = (gender) => {
        return gender === 'k' ? 'kadin' : 'erkek';
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 px-4 py-2 hover:bg-gray-100 rounded-md"
            >
                <span>Kategoriler</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-48 mt-2 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/shop/${getGenderText(category.gender)}/${category.code.split(':')[1]}/${category.id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryDropdown;
