import conf from "../conf/conf";
import { Client, Databases, ID,Query } from "appwrite";
import authService from "./auth";
import storageservice, { StorageService } from "./storage";


class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // 1️⃣ Add book
async addBook({ title, author, price, description, genre, file }) {
  try {
    const user = await authService.getCurrentUser();

    const uploadedFile = await storageservice.uploadFile({file});

    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteBooksCollectionId,
      ID.unique(),
      {
        title,
        author,
        price,
        description,
        genre,
        sellerid: user.$id,
        status: "available",
        coverImage: uploadedFile.$id
      }
    );
  } catch (error) {
    console.error("Database :: addBook :: error", error);
    throw error; // 👈 VERY IMPORTANT
  }
}


  // 2️⃣ Get all books
  async getAllBooks() {
  try {
    const response = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteBooksCollectionId
    );
    return response.documents;
  } catch (error) {
    console.error("Database :: getAllBooks :: error", error);
    throw error;
  }
}

// Add this new method (better name + supports quantity)
async createOrderItem(orderId, book, quantity = 1) {
  try {
    let buyerId = "guest"; // Default value for guest users

    // Try to get current user (safe way)
    try {
      const user = await authService.getCurrentUser();
      if (user && user.$id) {
        buyerId = user.$id; // Agar logged-in hai to real ID daal do
      }
    } catch (authError) {
      console.log("No logged-in user detected → treating as guest:", authError);
      // Guest allowed hai, to error throw mat karo
    }

    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwritePurchasesCollectionId,
      ID.unique(),
      {
        orderId: orderId,
        bookId: book.$id,
        sellerId: book.sellerid,
        buyerId: buyerId,                    // ← yahan safe value (guest ya real ID)
        quantity: quantity,
        priceAtPurchase: book.price,
        title: book.title,
        status: "pending",
        purchaseDate: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error("Database :: createOrderItem :: error", error);
    throw error;
  }
}

// Optional: Create a main "order" document (recommended for future)
async createOrder(totalAmount, source) {
  try {
    let buyerId = "guest";

    try {
      const user = await authService.getCurrentUser();
      if (user && user.$id) {
        buyerId = user.$id;
      }
    } catch (authError) {
      console.log("Guest checkout detected:", authError);
    }

    const orderDocument = await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteOrdersCollectionId,
      ID.unique(),
      {
        buyerId: buyerId,                    // ← safe value
        totalAmount: totalAmount,
        status: "pending",
        source: source,
        orderDate: new Date().toISOString(),
      }
    );

    console.log("Created order document:", orderDocument);
    return orderDocument;
  } catch (error) {
    console.error("Database :: createOrder :: error", error);
    throw error;
  }
}

          // ✅ FETCH BOOKS BY GENRE
  async fetchBooksByGenre({ genre, limit = 6 }) {
    try {
       
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBooksCollectionId,
        [
          Query.equal("genre", genre), // 🎯 backend filtering
          Query.limit(limit),
          Query.orderDesc('$createdAt')
        ]
      );
          
      return response.documents;
      
    } catch (error) {
      console.error("Database :: fetchBooksByGenre :: error", error);
      throw error;
    }
  }


  
}
    

const databaseService = new DatabaseService();
export default databaseService;
