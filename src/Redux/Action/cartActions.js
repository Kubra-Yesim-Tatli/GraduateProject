export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product
});

export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId
});

export const updateCartItemCount = (productId, count) => ({
    type: 'UPDATE_CART_ITEM_COUNT',
    payload: { productId, count }
});

export const toggleCartItemCheck = (productId) => ({
    type: 'TOGGLE_CART_ITEM_CHECK',
    payload: productId
});

export const toggleCartDropdown = () => ({
    type: 'TOGGLE_CART_DROPDOWN'
});

export const clearCart = () => ({
    type: 'CLEAR_CART'
});
