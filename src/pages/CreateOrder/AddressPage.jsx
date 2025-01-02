import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AddressForm from '../../components/AddressForm';
import axiosInstance from '../../api/axiosInstance';

const AddressPage = () => {
  const history = useHistory();
  const [addresses, setAddresses] = useState([]);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get('/user/address');
      setAddresses(response.data);
      if (response.data.length > 0 && !selectedShippingAddress) {
        setSelectedShippingAddress(response.data[0]);
        setSelectedBillingAddress(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error('Adresler yüklenirken bir hata oluştu');
    }
  };

  const handleAddressSubmit = async (data) => {
    try {
      await axiosInstance.post('/user/address', data);
      toast.success('Adres başarıyla eklendi');
      fetchAddresses();
      setIsAddingNew(false);
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Adres eklenirken bir hata oluştu');
    }
  };

  const handleAddressDelete = async (addressId) => {
    if (!window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/user/address/${addressId}`);
      toast.success('Adres başarıyla silindi');
      if (selectedShippingAddress?.id === addressId) {
        setSelectedShippingAddress(null);
      }
      if (selectedBillingAddress?.id === addressId) {
        setSelectedBillingAddress(null);
      }
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      toast.error('Adres silinirken bir hata oluştu');
    }
  };

  const handleContinue = () => {
    if (!selectedShippingAddress) {
      toast.error('Lütfen bir teslimat adresi seçin');
      return;
    }

    if (!isSameAddress && !selectedBillingAddress) {
      toast.error('Lütfen bir fatura adresi seçin');
      return;
    }

    // Store selected addresses in localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(selectedShippingAddress));
    localStorage.setItem('billingAddress', JSON.stringify(isSameAddress ? selectedShippingAddress : selectedBillingAddress));

    history.push('/order/payment');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#0891b2] text-white rounded-full flex items-center justify-center">
            1
          </div>
          <h2 className="ml-3 text-xl font-bold">Adres Bilgileri</h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Teslimat Adresi</h3>
          <button
            onClick={() => setIsAddingNew(true)}
            className="text-[#0891b2] hover:text-[#0891b2]/90"
          >
            + Yeni Adres Ekle
          </button>
        </div>

        {isAddingNew ? (
          <div className="mb-6">
            <AddressForm
              onSubmit={handleAddressSubmit}
              onCancel={() => setIsAddingNew(false)}
            />
          </div>
        ) : (
          <div className="grid gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedShippingAddress?.id === address.id
                    ? 'border-[#0891b2]'
                    : 'border-gray-200'
                }`}
                onClick={() => {
                  setSelectedShippingAddress(address);
                  if (isSameAddress) {
                    setSelectedBillingAddress(address);
                  }
                }}
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
                <div className="text-gray-600">{address.address}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isSameAddress}
              onChange={(e) => {
                setIsSameAddress(e.target.checked);
                if (e.target.checked) {
                  setSelectedBillingAddress(selectedShippingAddress);
                }
              }}
              className="form-checkbox h-4 w-4 text-[#0891b2]"
            />
            <span className="ml-2">Faturamı Aynı Adrese Gönder</span>
          </label>
        </div>

        {!isSameAddress && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Fatura Adresi</h3>
            <div className="grid gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedBillingAddress?.id === address.id
                      ? 'border-[#0891b2]'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedBillingAddress(address)}
                >
                  <div className="font-medium">{address.title}</div>
                  <div className="text-gray-600 mt-2">
                    {address.name} {address.surname}
                  </div>
                  <div className="text-gray-600">{address.phone}</div>
                  <div className="text-gray-600">
                    {address.neighborhood}, {address.district}, {address.city}
                  </div>
                  <div className="text-gray-600">{address.address}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
          2
        </div>
        <h2 className="ml-3 text-xl font-bold text-gray-400">Ödeme Seçenekleri</h2>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => history.push('/cart')}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Geri
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-[#0891b2] text-white rounded-md hover:bg-[#0891b2]/90"
        >
          Devam Et
        </button>
      </div>
    </div>
  );
};

export default AddressPage;
