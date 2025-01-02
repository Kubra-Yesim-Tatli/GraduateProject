import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/order');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Siparişler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Önceki Siparişlerim</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">Henüz hiç siparişiniz bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Sipariş #{order.id}</span>
                    <span className="text-gray-600">{formatDate(order.order_date)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-gray-600">
                      {order.products.length} Ürün
                    </span>
                    <span className="font-medium text-blue-600">
                      {order.price.toLocaleString('tr-TR')} TL
                    </span>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 ml-4 transform transition-transform ${
                    expandedOrder === order.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-gray-200 p-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Teslimat Adresi</h3>
                    <div className="text-gray-600">
                      <p>{order.address.title}</p>
                      <p>{order.address.address}</p>
                      <p>{order.address.city} / {order.address.district}</p>
                    </div>
                  </div>

                  <h3 className="font-medium mb-2">Ürünler</h3>
                  <div className="space-y-2">
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b last:border-b-0"
                      >
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            {product.detail} | Adet: {product.count}
                          </p>
                        </div>
                        <span className="font-medium">
                          {(product.price * product.count).toLocaleString('tr-TR')} TL
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Toplam Tutar</span>
                      <span className="font-bold text-lg text-blue-600">
                        {order.price.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousOrdersPage;
