import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const CompletePage = () => {
  const history = useHistory();
  const { cart } = useSelector((state) => state.cart);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [paymentCard, setPaymentCard] = useState(null);

  useEffect(() => {
    // Load addresses and payment info from localStorage
    const savedShippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    const savedBillingAddress = JSON.parse(localStorage.getItem('billingAddress'));
    const savedPaymentCard = JSON.parse(localStorage.getItem('selectedPaymentCard'));

    if (!savedShippingAddress || !savedPaymentCard) {
      toast.error('Lütfen adres ve ödeme bilgilerini tamamlayın');
      history.push('/order/address');
      return;
    }

    setShippingAddress(savedShippingAddress);
    setBillingAddress(savedBillingAddress);
    setPaymentCard(savedPaymentCard);
  }, [history]);

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.product.price * item.count), 0);
    const shipping = subtotal >= 150 ? 0 : 29.99;
    return (subtotal + shipping).toFixed(2);
  };

  const handleConfirmOrder = async () => {
    try {
      // Store order in localStorage since API is down
      const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        shipping_address: shippingAddress,
        billing_address: billingAddress,
        payment: {
          card_number: paymentCard.card_number,
          card_holder: paymentCard.card_holder,
          expire_month: paymentCard.expire_month,
          expire_year: paymentCard.expire_year
        },
        items: cart,
        total: calculateTotal()
      };

      // Get existing orders or initialize empty array
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart and order data
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('billingAddress');
      localStorage.removeItem('selectedPaymentCard');

      toast.success('Siparişiniz başarıyla oluşturuldu!');
      history.push('/order/success');
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Sipariş oluşturulurken bir hata oluştu');
    }
  };

  if (!shippingAddress || !paymentCard) {
    return <div className="container mx-auto px-4 py-8">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Sipariş Özeti</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Teslimat Adresi</h2>
        <div className="text-gray-600">
          <p className="font-medium">{shippingAddress.full_name}</p>
          <p>{shippingAddress.address}</p>
          <p>{shippingAddress.city}, {shippingAddress.district}</p>
          <p>{shippingAddress.phone}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>
        <div className="text-gray-600">
          <p className="font-medium">{paymentCard.card_holder}</p>
          <p>**** **** **** {paymentCard.card_number.slice(-4)}</p>
          <p>Son Kullanma: {paymentCard.expire_month}/{paymentCard.expire_year}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Sipariş Detayı</h2>
        {cart.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center py-2 border-b last:border-0">
            <div className="flex items-center">
              <img
                src={item.product.images[0]?.url}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">Adet: {item.count}</p>
              </div>
            </div>
            <div className="font-medium">
              {(item.product.price * item.count).toFixed(2)} TL
            </div>
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Toplam</span>
            <span>{calculateTotal()} TL</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => history.push('/order/payment')}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Geri
        </button>
        <button
          onClick={handleConfirmOrder}
          className="px-6 py-2 bg-[#0891b2] text-white rounded-md hover:bg-[#0891b2]/90"
        >
          Siparişi Onayla
        </button>
      </div>
    </div>
  );
};

export default CompletePage;
