// Save cart array to localStorage

export const saveCartsToLocalStorage = (carts) => {
  try {
    const serializedCarts = JSON.stringify(carts); // convert array to string
    localStorage.setItem('carts', serializedCarts); // save in browser
  } catch (e) {
    console.error("Could not save carts", e);
  }
};

// Load cart array from localStorage
export const loadCartsFromLocalStorage = () => {
  try {
    const serializedCarts = localStorage.getItem('carts');
    if (serializedCarts === null) return undefined; // nothing saved yet
    return JSON.parse(serializedCarts); // convert string back to array
  } catch (e) {
    console.error("Could not load carts", e);
    return undefined;
  }
};
