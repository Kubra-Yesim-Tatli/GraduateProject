import React from 'react';
import { useForm } from 'react-hook-form';

const CreditCardForm = ({ onSubmit, onCancel, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
        <input
          {...register('name_on_card', { required: 'Kart üzerindeki isim gerekli' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          placeholder="Kart üzerindeki isim"
        />
        {errors.name_on_card && (
          <p className="mt-1 text-sm text-red-600">{errors.name_on_card.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Kart Numarası</label>
        <input
          {...register('card_no', {
            required: 'Kart numarası gerekli',
            pattern: {
              value: /^[0-9]{16}$/,
              message: 'Geçerli bir kart numarası girin'
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          placeholder="1234 5678 9012 3456"
          maxLength={16}
        />
        {errors.card_no && (
          <p className="mt-1 text-sm text-red-600">{errors.card_no.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Son Kullanma Ayı</label>
          <select
            {...register('expire_month', { required: 'Son kullanma ayı gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          >
            <option value="">Ay seçin</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {month.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          {errors.expire_month && (
            <p className="mt-1 text-sm text-red-600">{errors.expire_month.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Son Kullanma Yılı</label>
          <select
            {...register('expire_year', { required: 'Son kullanma yılı gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          >
            <option value="">Yıl seçin</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.expire_year && (
            <p className="mt-1 text-sm text-red-600">{errors.expire_year.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CVV</label>
        <input
          {...register('cvv', {
            required: 'CVV gerekli',
            pattern: {
              value: /^[0-9]{3,4}$/,
              message: 'Geçerli bir CVV girin'
            }
          })}
          type="password"
          maxLength={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          placeholder="***"
        />
        {errors.cvv && (
          <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            İptal
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0891b2] hover:bg-[#0891b2]/90"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default CreditCardForm;
