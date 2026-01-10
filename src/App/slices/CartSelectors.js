
// Items selector (optional, but useful)
export const selectCartItems = (state) => state.cart.items;

// Total Quantity
export const selectTotalQuantity = (state) =>{ 
 
  return state.cart.items.reduce((total, item) => total + item.qty, 0);}

// Total Price
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.qty, 0);
