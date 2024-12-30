import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Action/cartActions";

const ProductCard = () => {
  const dispatch = useDispatch();

  const products = [
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48", images: [{ url: "/img/img1.jfif" }], name: "Graphic Design", description: "Problems trying to resolve the conflict between", price: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48", images: [{ url: "/img/img2.jfif" }], name: "Graphic Design", description: "Problems trying to resolve the conflict between", price: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48", images: [{ url: "/img/img3.jfif" }], name: "Graphic Design", description: "Problems trying to resolve the conflict between", price: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48", images: [{ url: "/img/img4.jfif" }], name: "Graphic Design", description: "Problems trying to resolve the conflict between", price: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48", images: [{ url: "/img/img5.jfif" }], name: "Graphic Design", description: "Problems trying to resolve the conflict between", price: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48", images: [{ url: "/img/img6.jfif" }], name: "Graphic Design", description: "Problems trying to resolve the conflict between", price: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48", images: [{ url: "/img/img7.jfif" }], name: "Graphic Design", description: "Problems trying to resolve the conflict between", price: "$6.48" },
    { title: "Graphic Design", department: "English Department", oldPrice: "$16.48", newPrice: "$6.48", images: [{ url: "/img/img8.jfif" }], name: "Graphic Design", description: "Problems trying to resolve the conflict between", price: "$6.48" },
  ];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

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
            className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg"
          >
            <img
              src={product.images[0].url}
              alt={product.title}
              className="w-48 h-80 object-cover mb-4 rounded-md"
            />
            <div className="text-center w-full">
              <h4 className="font-bold text-lg mb-1">{product.title}</h4>
              <p className="text-gray-500 mb-2">{product.department}</p>
              <div className="flex justify-center items-center gap-2 mb-4">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through">{product.oldPrice} TL</span>
                )}
                <span className="text-green-600 font-bold">{product.newPrice} TL</span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
