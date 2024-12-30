import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { removeFromCart, updateCartItemCount, toggleCartItemCheck } from '../Redux/Action/cartActions';

const CartPage = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    const handleQuantityChange = (item, change) => {
        const newCount = item.count + change;
        if (newCount >= 1) {
            dispatch(updateCartItemCount(item.product.id, newCount));
        }
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleToggleCheck = (productId) => {
        dispatch(toggleCartItemCheck(productId));
    };

    const calculateTotal = () => {
        return cart
            .filter(item => item.checked)
            .reduce((total, item) => total + (item.product.price * item.count), 0);
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Alışveriş Sepeti</h1>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <p className="text-gray-600">Sepetinizde ürün bulunmamaktadır.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Alışveriş Sepeti ({cart.length} Ürün)</h1>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-sm font-medium text-gray-600">
                    <div className="col-span-1">Seç</div>
                    <div className="col-span-2">Ürün</div>
                    <div className="col-span-3">Ürün Adı</div>
                    <div className="col-span-2">Fiyat</div>
                    <div className="col-span-2">Adet</div>
                    <div className="col-span-1">Toplam</div>
                    <div className="col-span-1">İşlem</div>
                </div>

                {/* Cart Items */}
                {cart.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                        <div className="col-span-1">
                            <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => handleToggleCheck(item.product.id)}
                                className="w-4 h-4 text-[#0891b2] border-gray-300 rounded focus:ring-[#0891b2]"
                            />
                        </div>
                        <div className="col-span-2">
                            <img
                                src={item.product.images[0]?.url}
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded"
                            />
                        </div>
                        <div className="col-span-3">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">Beden: {item.product.size}</p>
                        </div>
                        <div className="col-span-2">
                            <span className="font-medium">{item.product.price} TL</span>
                        </div>
                        <div className="col-span-2">
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleQuantityChange(item, -1)}
                                    className="p-1 rounded-md hover:bg-gray-100"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center">{item.count}</span>
                                <button
                                    onClick={() => handleQuantityChange(item, 1)}
                                    className="p-1 rounded-md hover:bg-gray-100"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <span className="font-medium">{(item.product.price * item.count).toFixed(2)} TL</span>
                        </div>
                        <div className="col-span-1">
                            <button
                                onClick={() => handleRemoveItem(item.product.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Total Section */}
                <div className="p-4 bg-gray-50">
                    <div className="flex justify-end items-center space-x-4">
                        <span className="text-gray-600">Seçili Ürünler Toplam:</span>
                        <span className="text-2xl font-bold text-[#0891b2]">{calculateTotal().toFixed(2)} TL</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
