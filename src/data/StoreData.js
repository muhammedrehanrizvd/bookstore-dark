const StoreData = [
  // ===== EXISTING STORES (UNCHANGED) =====
  {
    id: 1,
    name: "Madina Book House",
    address: "Aminabad, Lucknow, Uttar Pradesh",
    type: "offline",
    rating: 4,
    contact: "+91 9876543210",
  },
  {
    id: 2,
    name: "Darul Ilm Book Store",
    address: "Nizamuddin West, New Delhi",
    type: "offline",
    rating: 5,
    contact: "+91 9123456780",
  },
  {
    id: 3,
    name: "Islamic World Books",
    address: "Charminar, Hyderabad, Telangana",
    type: "offline",
    rating: 3,
    contact: "+91 9988776655",
  },
  {
    id: 4,
    name: "Amazon India",
    link: "https://www.amazon.in",
    type: "online",
    rating: 5,
  },
  {
    id: 5,
    name: "Flipkart",
    link: "https://www.flipkart.com",
    type: "online",
    rating: 4,
  },
  {
    id: 6,
    name: "Dar-us-Salam Store",
    link: "https://darussalamstore.com",
    type: "online",
    rating: 5,
  },

  // ===== NEW FEATURED STORES (ONLY FOR FEATURED SECTION) =====
  {
    id: 7,
    name: "Goodword Books",
    link: "https://goodwordbooks.com",
    type: "online",
    rating: 5,
    isFeatured: true,
  },
  {
    id: 8,
    name: "Al-Huda International Store",
    link: "https://alhudastore.com",
    type: "online",
    rating: 4,
    isFeatured: true,
  },
  {
    id: 9,
    name: "Markaz Book Centre",
    address: "Kozhikode, Kerala",
    type: "offline",
    rating: 5,
    contact: "+91 9090909090",
    isFeatured: true,
  },
];

export default StoreData;
