import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.color === action.payload.color && 
        item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => 
        !(item.id === action.payload.id && 
          item.color === action.payload.color && 
          item.size === action.payload.size)
      );
      
      state.total = state.items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      );
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => 
        item.id === action.payload.id && 
        item.color === action.payload.color && 
        item.size === action.payload.size
      );

      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((total, item) => 
          total + (item.price * item.quantity), 0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;