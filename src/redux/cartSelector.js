export const selectCartItems = (state) => state.cart.items;

export const selectCartSubtotal = (state) => {
  const items = selectCartItems(state);
  return items.reduce((subtotal, item) => subtotal + item.quantity * parseFloat(item.price), 0).toFixed(2);
};
