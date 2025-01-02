const initialState = {
    cart: [],
    isOpen: false
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.cart.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.product.id === action.payload.id
                            ? { ...item, count: item.count + 1 }
                            : item
                    )
                };
            }
            return {
                ...state,
                cart: [...state.cart, { count: 1, checked: true, product: action.payload }]
            };

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(item => item.product.id !== action.payload)
            };

        case 'UPDATE_CART_ITEM_COUNT':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.product.id === action.payload.productId
                        ? { ...item, count: action.payload.count }
                        : item
                )
            };

        case 'TOGGLE_CART_ITEM_CHECK':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.product.id === action.payload
                        ? { ...item, checked: !item.checked }
                        : item
                )
            };

        case 'TOGGLE_CART_DROPDOWN':
            return {
                ...state,
                isOpen: !state.isOpen
            };

        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            };

        default:
            return state;
    }
};

export default cartReducer;
