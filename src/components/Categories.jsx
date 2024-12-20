import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../redux/Action/categoryAction';

const Categories = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Sort categories by rating and get top 5
    const topCategories = [...categories]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    const getGenderText = (gender) => {
        return gender === 'k' ? 'kadin' : 'erkek';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">En Çok Tercih Edilen Kategoriler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {topCategories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/shop/${getGenderText(category.gender)}/${category.code.split(':')[1]}`}
                        className="block p-4 border rounded-lg hover:shadow-lg transition-shadow"
                    >
                        <img
                            src={category.img}
                            alt={category.title}
                            className="w-full h-40 object-cover rounded-lg mb-2"
                        />
                        <h3 className="font-semibold text-lg">{category.title}</h3>
                        <div className="flex items-center mt-2">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1">{category.rating}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
