import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      if (Array.isArray(savedOrders)) {
        setOrders(savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    }
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'processing':
        return 'İşleniyor';
      case 'shipped':
        return 'Kargoda';
      case 'delivered':
        return 'Teslim Edildi';
      default:
        return 'Beklemede';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-600">Henüz siparişiniz bulunmamaktadır.</p>
          <button
            onClick={() => history.push('/shop')}
            className="mt-4 text-[#0891b2] hover:text-[#0891b2]/90"
          >
            Alışverişe Başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Siparişlerim</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          order && order.items && Array.isArray(order.items) ? (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Sipariş Tarihi</p>
                    <p className="font-medium">{formatDate(order.date)}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      item && item.product ? (
                        <div key={item.product.id} className="flex items-center">
                          <img
                            src={item.product.images?.[0]?.url || item.product.image || '/placeholder.jpg'}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">Adet: {item.count}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{(item.product.price * item.count).toFixed(2)} TL</p>
                          </div>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Teslimat Adresi</p>
                      <p className="font-medium">{order.shipping_address?.full_name}</p>
                      <p className="text-sm text-gray-600">{order.shipping_address?.address}</p>
                      <p className="text-sm text-gray-600">
                        {order.shipping_address?.district}, {order.shipping_address?.city}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Toplam Tutar</p>
                      <p className="text-xl font-bold text-[#0891b2]">{order.total?.toFixed(2)} TL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

export default PreviousOrdersPage;
