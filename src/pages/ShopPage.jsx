import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";


const categories = [
  { id: 1, name: "Cloths", items: 8, image: "/img/img1.jfif" },
  { id: 2, name: "Cloths", items: 5, image: "/img/img2.jfif" },
  { id: 3, name: "Cloths", items: 5, image: "/img/img3.jfif" },
  { id: 4, name: "Cloths", items: 5, image: "/img/img4.jfif" },
  { id: 5, name: "Cloths", items: 5, image: "/img/img5.jfif" },
];

const ShopPage = () => {
  return (
    <>
      <Header />
      <main className="max-w-screen-lg mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Shop</h1>
        <nav className="text-sm mb-8 text-gray-600 flex justify-center">
          <span>Home</span> <span className="mx-2"> &gt; </span>
          <span>Shop</span>
        </nav>
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
      </main>
      <Footer />
    </>
  );
};

export default ShopPage;
