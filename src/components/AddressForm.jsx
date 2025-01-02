import React from 'react';
import { useForm } from 'react-hook-form';

const AddressForm = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Adres Başlığı</label>
          <input
            {...register('title', { required: 'Adres başlığı gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefon</label>
          <input
            {...register('phone', { required: 'Telefon numarası gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ad</label>
          <input
            {...register('name', { required: 'Ad gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Soyad</label>
          <input
            {...register('surname', { required: 'Soyad gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          />
          {errors.surname && <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">İl</label>
          <input
            {...register('city', { required: 'İl gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">İlçe</label>
          <input
            {...register('district', { required: 'İlçe gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          />
          {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mahalle</label>
          <input
            {...register('neighborhood', { required: 'Mahalle gerekli' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
          />
          {errors.neighborhood && <p className="mt-1 text-sm text-red-600">{errors.neighborhood.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Adres</label>
        <textarea
          {...register('address', { required: 'Adres gerekli' })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0891b2] focus:ring-[#0891b2]"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          İptal
        </button>
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

export default AddressForm;
