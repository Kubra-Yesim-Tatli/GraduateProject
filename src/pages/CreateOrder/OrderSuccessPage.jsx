import React from 'react';
import { useHistory } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Siparişiniz Başarıyla Oluşturuldu!
        </h1>
        <p className="text-gray-600 mb-8">
          Siparişiniz başarıyla alındı. Siparişinizin durumunu "Siparişlerim" sayfasından takip edebilirsiniz.
        </p>
        <div className="space-y-4">
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
  );
};

export default OrderSuccessPage;
