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

async createPurchase(book) {
  try {
    const user = await authService.getCurrentUser();

    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwritePurchasesCollectionId,
      ID.unique(),
      {
        bookId: book.$id,
        sellerid: book.sellerid,
        buyerid: user.$id,
        price: book.price,
        status: "completed",
        purchaseDate: new Date().toISOString()
      }
    );
  } catch (error) {
    console.error("Database :: createPurchase :: error", error);
    throw error;
  }
}


  async getUserPurchases() {
  try {
    const user = await authService.getCurrentUser();

     const response = await this.databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwritePurchasesCollectionId,
      [Query.equal("buyerid", user.$id)]
    );

    return response.documents;
  } catch (error) {
    console.error("Database :: getUserPurchases :: error", error);
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
