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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Siparişiniz Başarıyla Oluşturuldu!
        </h2>
        <p className="mt-2 text-gray-600">
          Siparişiniz için teşekkür ederiz. Siparişinizin durumunu profilinizden takip edebilirsiniz.
        </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => history.push('/profile/orders')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Siparişlerimi Görüntüle
          </button>
          <button
            onClick={() => history.push('/')}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            Alışverişe Devam Et
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          5 saniye içinde otomatik olarak ana sayfaya yönlendirileceksiniz...
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
