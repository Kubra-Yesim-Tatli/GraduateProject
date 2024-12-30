import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get('https://workintech-fe-ecommerce.onrender.com/user/address');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Adresler yüklenirken bir hata oluştu');
    }
  };

  const handleAddressSubmit = async (data) => {
    try {
      await axios.post('https://workintech-fe-ecommerce.onrender.com/user/address', data);
      toast.success('Adres başarıyla eklendi');
      fetchAddresses();
      setIsAddingNew(false);
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Adres eklenirken bir hata oluştu');
    }
  };

  const handleAddressDelete = async (addressId) => {
    try {
      await axios.delete(`https://workintech-fe-ecommerce.onrender.com/user/address/${addressId}`);
      toast.success('Adres başarıyla silindi');
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Adres silinirken bir hata oluştu');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-[#0891b2] text-white rounded-full flex items-center justify-center mr-2">1</div>
          <h2 className="text-xl font-bold">Adres Bilgileri</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Teslimat Adresi</h3>
            <button
              onClick={() => setIsAddingNew(true)}
              className="text-[#0891b2] hover:text-[#0891b2]/90"
            >
              + Yeni Adres Ekle
            </button>
          </div>

          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`border p-4 rounded-lg cursor-pointer ${
                  selectedShippingAddress?.id === address.id ? 'border-[#0891b2]' : 'border-gray-200'
                }`}
                onClick={() => setSelectedShippingAddress(address)}
              >
                <div className="flex justify-between">
                  <div className="font-medium">{address.title}</div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddressDelete(address.id);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    Sil
                  </button>
                </div>
                <div className="text-gray-600 mt-2">
                  {address.name} {address.surname}
                </div>
                <div className="text-gray-600">{address.phone}</div>
                <div className="text-gray-600">
                  {address.neighborhood}, {address.district}, {address.city}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isSameAddress}
                onChange={(e) => setIsSameAddress(e.target.checked)}
                className="form-checkbox h-4 w-4 text-[#0891b2]"
              />
              <span className="ml-2">Faturamı Aynı Adrese Gönder</span>
            </label>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mr-2">2</div>
          <h2 className="text-xl font-bold text-gray-600">Ödeme Seçenekleri</h2>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
