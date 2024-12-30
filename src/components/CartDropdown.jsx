import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateCartItemCount, toggleCartItemCheck, toggleCartDropdown } from '../Redux/Action/cartActions';

const CartDropdown = () => {
    const dispatch = useDispatch();
    const { cart, isOpen } = useSelector(state => state.cart);

    const totalPrice = cart.reduce((total, item) => {
        if (item.checked) {
            return total + (item.product.price * item.count);
        }
        return total;
    }, 0);

    const totalItems = cart.reduce((total, item) => total + item.count, 0);

    const handleQuantityChange = (productId, newCount) => {
        if (newCount < 1) {
            dispatch(removeFromCart(productId));
        } else {
            dispatch(updateCartItemCount(productId, newCount));
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => dispatch(toggleCartDropdown())}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 rounded-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Sepetim</span>
                {totalItems > 0 && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                        {totalItems}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Sepetim ({totalItems} Ürün)</h3>
                        
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">Sepetiniz boş</p>
                        ) : (
                            <>
                                <div className="space-y-4 max-h-96 overflow-auto">
                                    {cart.map((item) => (
                                        <div key={item.product.id} className="flex items-center space-x-4 border-b pb-4">
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={() => dispatch(toggleCartItemCheck(item.product.id))}
                                                className="h-4 w-4 text-orange-500"
                                            />
                                            <img
                                                src={item.product.images[0].url}
                                                alt={item.product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-medium">{item.product.name}</h4>
                                                <div className="text-sm text-gray-500">
                                                    {item.product.size && <span>Beden: {item.product.size}</span>}
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.product.id, item.count - 1)}
                                                            className="text-gray-500 hover:text-gray-700"
                                                        >
                                                            -
                                                        </button>
                                                        <span>{item.count}</span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.product.id, item.count + 1)}
                                                            className="text-gray-500 hover:text-gray-700"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <span className="font-medium">{item.product.price} TL</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => dispatch(removeFromCart(item.product.id))}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold">Toplam</span>
                                        <span className="font-semibold text-lg">{totalPrice.toFixed(2)} TL</span>
                                    </div>
                                    <div className="space-y-2">
                                        <Link
                                            to="/cart"
                                            onClick={() => dispatch(toggleCartDropdown())}
                                            className="block w-full bg-[#0891b2] text-white text-center py-2 rounded-md hover:bg-[#0891b2]/90"
                                        >
                                            Sepete Git
                                        </Link>
                                        <button
                                            onClick={() => dispatch(toggleCartDropdown())}
                                            className="block w-full bg-gray-200 text-gray-800 text-center py-2 rounded-md hover:bg-gray-300"
                                        >
                                            Alışverişe Devam Et
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartDropdown;
