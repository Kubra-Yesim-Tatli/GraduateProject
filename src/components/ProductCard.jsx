import React from "react";

const ProductCard = () => {
  const products = [
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold mb-2">Featured Products</h2>
      <h3 className="text-center text-2xl font-bold mb-4">BESTSELLER PRODUCTS</h3>
      <p className="text-center text-gray-600 mb-6">
        Problems trying to resolve the conflict between
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-md p-4"
          >
            <img
              src={`/img/img${index + 4}.jfif`} 
              alt={product.title}
              className="w-48 h-80 object-cover mb-4"
            />
            <div className="text-center">
              <h4 className="font-bold text-lg mb-1">{product.title}</h4>
              <p className="text-gray-500 mb-2">{product.department}</p>
              <div className="flex justify-center items-center gap-2">
                <span className="text-gray-400 line-through">{product.oldPrice}</span>
                <span className="text-green-600 font-bold">{product.newPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
