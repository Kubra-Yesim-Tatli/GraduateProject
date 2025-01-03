import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearCart } from '../../Redux/Action/cartActions';
import CreditCardForm from '../../components/CreditCardForm';

const PaymentPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    // Load cards from localStorage
    const savedCards = JSON.parse(localStorage.getItem('userCards') || '[]');
    setCards(savedCards);
    if (savedCards.length > 0 && !selectedCard) {
      setSelectedCard(savedCards[0]);
    }
  }, []);

  const handleCardSubmit = async (data) => {
    try {
      const newCard = {
        id: Date.now(),
        ...data
      };

      if (isEditing) {
        // Update existing card
        const updatedCards = cards.map(card =>
          card.id === editingCard.id ? { ...newCard, id: card.id } : card
        );
        setCards(updatedCards);
        localStorage.setItem('userCards', JSON.stringify(updatedCards));
        toast.success('Kart başarıyla güncellendi');
      } else {
        // Add new card
        const updatedCards = [...cards, newCard];
        setCards(updatedCards);
        localStorage.setItem('userCards', JSON.stringify(updatedCards));
        toast.success('Kart başarıyla eklendi');
      }

      setIsAddingNew(false);
      setIsEditing(false);
      setEditingCard(null);
      setSelectedCard(newCard);
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error('Kart kaydedilirken bir hata oluştu');
    }
  };

  const handleCardDelete = (cardId) => {
    if (!window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const updatedCards = cards.filter(card => card.id !== cardId);
      setCards(updatedCards);
      localStorage.setItem('userCards', JSON.stringify(updatedCards));
      
      if (selectedCard?.id === cardId) {
        setSelectedCard(updatedCards[0] || null);
      }
      
      toast.success('Kart başarıyla silindi');
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
    if (!cardNo) return '****';
    return `**** **** **** ${cardNo.toString().slice(-4)}`;
  };

  const handleConfirmOrder = async () => {
    if (!selectedCard) {
      toast.error('Lütfen bir kart seçin');
      return;
    }

    try {
      // Get addresses and cart from localStorage/Redux
      const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
      const billingAddress = JSON.parse(localStorage.getItem('billingAddress'));
      
      if (!shippingAddress) {
        toast.error('Teslimat adresi bulunamadı');
        return;
      }

      // Calculate total
      const total = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

      // Create order object
      const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        shipping_address: shippingAddress,
        billing_address: billingAddress || shippingAddress,
        payment: {
          card_number: selectedCard.card_number,
          card_holder: selectedCard.card_holder,
          expire_month: selectedCard.expire_month,
          expire_year: selectedCard.expire_year
        },
        items: cart.map(item => ({
          product: item.product,
          count: item.count
        })),
        total: total,
        status: 'pending'
      };

      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart in Redux
      dispatch(clearCart());

      // Clear order data from localStorage
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('billingAddress');
      localStorage.removeItem('selectedPaymentCard');

      // Show success message and redirect
      toast.success('Siparişiniz başarıyla oluşturuldu!', {
        onClose: () => {
          history.push('/profile/orders');
        },
        autoClose: 2000
      });
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Sipariş oluşturulurken bir hata oluştu');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
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
                        <div className="font-medium">{card.card_holder || card.name_on_card}</div>
                        <div className="text-gray-600">{formatCardNumber(card.card_number || card.card_no)}</div>
                        <div className="text-sm text-gray-500">
                          Son Kullanma: {(card.expire_month || '').toString().padStart(2, '0')}/{card.expire_year || ''}
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

          <div className="mt-8 flex justify-start space-x-4">
            <button
              onClick={() => history.push('/order/address')}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Geri
            </button>
          </div>
        </div>

        <div className="col-span-4">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Ürünün Toplamı</span>
                <span className="font-semibold">
                  {cart.reduce((sum, item) => sum + (item.product.price * item.count), 0).toFixed(2)} TL
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Kargo Toplam</span>
                <span className="font-semibold">29,99 TL</span>
              </div>
              
              <div className="flex justify-between text-green-600">
                <span>150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
                <span>-29,99 TL</span>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg">Toplam</span>
                <span className="text-xl font-bold text-[#f97316]">
                  {cart.reduce((sum, item) => sum + (item.product.price * item.count), 0).toFixed(2)} TL
                </span>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full bg-[#0891b2] text-white py-3 px-4 rounded-lg mt-6 hover:bg-[#0891b2]/90 transition-colors"
            >
              Kaydet ve Devam Et
            </button>

            <div className="mt-4 text-sm text-gray-600">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>
                  <a href="#" className="text-[#f97316]">Ön Bilgilendirme Koşulları</a>
                  {' '}ve{' '}
                  <a href="#" className="text-[#f97316]">Mesafeli Satış Sözleşmesi</a>
                  'ni okudum, onaylıyorum.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
