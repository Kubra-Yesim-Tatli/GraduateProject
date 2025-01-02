import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../store/slices/cartSlice';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

const CompletePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const selectedAddress = useSelector((state) => state.order.selectedAddress);
  const paymentInfo = useSelector((state) => state.order.paymentInfo);

  const handleCompleteOrder = async () => {
    try {
      const orderData = {
        address_id: selectedAddress.id,
        order_date: new Date().toISOString(),
        card_no: paymentInfo.card_number,
        card_name: paymentInfo.card_holder,
        card_expire_month: parseInt(paymentInfo.expire_month),
        card_expire_year: parseInt(paymentInfo.expire_year),
        card_ccv: parseInt(paymentInfo.ccv),
        price: cart.total,
        products: cart.items.map(item => ({
          product_id: item.id,
          count: item.quantity,
          detail: `${item.color} - ${item.size}`
        }))
      };

      const response = await axiosInstance.post('/order', orderData);
      
      if (response.status === 200 || response.status === 201) {
        toast.success('Siparişiniz başarıyla oluşturuldu!');
        dispatch(clearCart());
        history.push('/order/success');
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu');
    }
  };

  useEffect(() => {
    if (!selectedAddress || !paymentInfo || cart.items.length === 0) {
      history.push('/cart');
    }
  }, [selectedAddress, paymentInfo, cart, history]);

  if (!selectedAddress || !paymentInfo || cart.items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Sipariş Özeti</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Teslimat Adresi</h3>
          <div className="border p-4 rounded">
            <p className="font-medium">{selectedAddress.title}</p>
            <p className="text-gray-600 mt-1">{selectedAddress.address}</p>
            <p className="text-gray-600">{selectedAddress.city} / {selectedAddress.district}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Kart Bilgileri</h3>
          <div className="border p-4 rounded">
            <p className="font-medium">{paymentInfo.card_holder}</p>
            <p className="text-gray-600 mt-1">**** **** **** {paymentInfo.card_number.slice(-4)}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Ürünler</h3>
          {cart.items.map((item, index) => (
            <div key={index} className="border-b py-2">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">
                {item.color} - {item.size} | Adet: {item.quantity}
              </p>
              <p className="text-right font-medium">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</p>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Toplam: {cart.total.toLocaleString('tr-TR')} TL</p>
          </div>
        </div>

        <button
          onClick={handleCompleteOrder}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
