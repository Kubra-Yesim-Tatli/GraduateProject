import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAddress: null,
  paymentInfo: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },
    clearOrderData: (state) => {
      state.selectedAddress = null;
      state.paymentInfo = null;
    },
  },
});

export const { setSelectedAddress, setPaymentInfo, clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;
