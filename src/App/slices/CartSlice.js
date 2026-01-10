import { createSlice } from "@reduxjs/toolkit";
import { saveCartsToLocalStorage,loadCartsFromLocalStorage } from "../../utils/LocalStorage";
const initialState = {
  items:loadCartsFromLocalStorage()||[],
  
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ Add to cart
    addToCart(state, action) {
  const book = action.payload;
state.items.push({ ...book, qty: 1 });
    
saveCartsToLocalStorage(state.items);

},


    // ❌ Remove from cart
    removeFromCart(state, action) {
  const id = action.payload;
  const item = state.items.find(item => item.id === id);
  if (!item) return;
  ;
state.items = state.items.filter(item => item.id !== id);
saveCartsToLocalStorage(state.items)
},


    // ➕ Increase quantity
    increaseQty(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (!item) return;
          
      item.qty += 1;
      

  saveCartsToLocalStorage(state.items);
    },

    // ➖ Decrease quantity
    decreaseQty(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);
      if (!item) return;
      const price = Number(item.price)

      if (item.qty === 1) {
        
  state.items = state.items.filter(item => item.id !== id);
      } else {
        item.qty -= 1;
       

      }
      
  saveCartsToLocalStorage(state.items);
    },

    // 🧹 Clear cart
    clearCart(state) {
      state.items = [];
      
      saveCartsToLocalStorage(state.items)
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
