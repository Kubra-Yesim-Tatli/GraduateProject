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

    const calculateSubtotal = () => {
        return cart
            .filter(item => item.checked)
            .reduce((total, item) => total + (item.product.price * item.count), 0);
    };

    const calculateShipping = (subtotal) => {
        return subtotal >= 150 ? 0 : 29.99;
    };

    const calculateDiscount = (subtotal) => {
        // Örnek: 150 TL üzeri alışverişlerde kargo bedava
        return subtotal >= 150 ? 29.99 : 0;
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shipping = calculateShipping(subtotal);
        const discount = calculateDiscount(subtotal);
        return subtotal + shipping - discount;
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
            
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart Items Table */}
                <div className="lg:w-2/3">
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
                                    <span className="font-medium">{item.product.price.toFixed(2)} TL</span>
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
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold mb-6">Sipariş Özeti</h2>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Ürünlerin Toplamı</span>
                                <span>{calculateSubtotal().toFixed(2)} TL</span>
                            </div>
                            
                            <div className="flex justify-between text-gray-600">
                                <span>Kargo Toplam</span>
                                <span>{calculateShipping(calculateSubtotal()).toFixed(2)} TL</span>
                            </div>

                            {calculateDiscount(calculateSubtotal()) > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>150 TL Üzeri Kargo Bedava</span>
                                    <span>-{calculateDiscount(calculateSubtotal()).toFixed(2)} TL</span>
                                </div>
                            )}
                            
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span>Toplam</span>
                                    <span className="text-[#0891b2]">{calculateTotal().toFixed(2)} TL</span>
                                </div>
                            </div>

                            <button 
                                className="w-full bg-[#0891b2] text-white py-3 px-4 rounded-md hover:bg-[#0891b2]/90 transition-colors mt-6"
                                onClick={() => {/* Sipariş oluşturma fonksiyonu henüz eklenmedi */}}
                            >
                                Sepeti Onayla
                            </button>

                            <div className="text-xs text-gray-500 mt-4">
                                * 150 TL ve üzeri alışverişlerinizde kargo bedava!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
