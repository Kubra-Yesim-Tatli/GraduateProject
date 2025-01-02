import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CreditCardForm from '../../components/CreditCardForm';
import axiosInstance from '../../api/axiosInstance';

const PaymentPage = () => {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axiosInstance.get('/user/card');
      setCards(response.data);
      if (response.data.length > 0 && !selectedCard) {
        setSelectedCard(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('Kartlar yüklenirken bir hata oluştu');
    }
  };

  const handleCardSubmit = async (data) => {
    try {
      if (isEditing) {
        await axiosInstance.put('/user/card', {
          ...data,
          id: editingCard.id
        });
        toast.success('Kart başarıyla güncellendi');
      } else {
        await axiosInstance.post('/user/card', data);
        toast.success('Kart başarıyla eklendi');
      }
      fetchCards();
      setIsAddingNew(false);
      setIsEditing(false);
      setEditingCard(null);
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error(error.response?.data?.message || 'Kart kaydedilirken bir hata oluştu');
    }
  };

  const handleCardDelete = async (cardId) => {
    if (!window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/user/card/${cardId}`);
      toast.success('Kart başarıyla silindi');
      if (selectedCard?.id === cardId) {
        setSelectedCard(null);
      }
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Kart silinirken bir hata oluştu');
    }
  };

  const handleEditCard = (card) => {
    setIsEditing(true);
    setEditingCard(card);
    setIsAddingNew(true);
  };

  const formatCardNumber = (cardNo) => {
    return `**** **** **** ${cardNo.slice(-4)}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#0891b2] text-white rounded-full flex items-center justify-center">
            2
          </div>
          <h2 className="ml-3 text-xl font-bold">Ödeme Bilgileri</h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Kayıtlı Kartlarım</h3>
          {!isAddingNew && (
            <button
              onClick={() => {
                setIsAddingNew(true);
                setIsEditing(false);
                setEditingCard(null);
              }}
              className="text-[#0891b2] hover:text-[#0891b2]/90"
            >
              + Yeni Kart Ekle
            </button>
          )}
        </div>

        {isAddingNew ? (
          <div className="mb-6">
            <CreditCardForm
              onSubmit={handleCardSubmit}
              onCancel={() => {
                setIsAddingNew(false);
                setIsEditing(false);
                setEditingCard(null);
              }}
              initialData={editingCard}
            />
          </div>
        ) : (
          <div className="grid gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedCard?.id === card.id ? 'border-[#0891b2]' : 'border-gray-200'
                }`}
                onClick={() => setSelectedCard(card)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{card.name_on_card}</div>
                    <div className="text-gray-600">{formatCardNumber(card.card_no)}</div>
                    <div className="text-sm text-gray-500">
                      Son Kullanma: {card.expire_month.toString().padStart(2, '0')}/{card.expire_year}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCard(card);
                      }}
                      className="text-[#0891b2] hover:text-[#0891b2]/90"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardDelete(card.id);
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => history.push('/create-order/address')}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Geri
        </button>
        <button
          onClick={() => {
            if (!selectedCard) {
              toast.error('Lütfen bir kart seçin');
              return;
            }
            history.push('/create-order/summary');
          }}
          className="px-6 py-2 bg-[#0891b2] text-white rounded-md hover:bg-[#0891b2]/90"
        >
          Devam Et
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
