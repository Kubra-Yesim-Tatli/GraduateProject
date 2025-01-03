import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const OrderSuccessPage = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-green-500 mb-2">
            Siparişiniz Başarıyla Oluşturuldu!
          </h2>
          <p className="text-center text-lg text-gray-600 mt-4">
            Alışverişiniz için teşekkür ederiz...
          </p>
          <div className="mt-8 space-y-4 w-full">
            <button
              onClick={() => history.push('/profile/orders')}
              className="w-full bg-[#0891b2] text-white py-3 px-4 rounded-md hover:bg-[#0891b2]/90 transition-colors"
            >
              Siparişlerimi Görüntüle
            </button>
            <button
              onClick={() => history.push('/')}
              className="w-full bg-gray-50 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-100 transition-colors"
            >
              Alışverişe Devam Et
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            5 saniye içinde otomatik olarak ana sayfaya yönlendirileceksiniz...
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
