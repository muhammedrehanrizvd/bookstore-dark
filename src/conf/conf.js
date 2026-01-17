const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteBooksCollectionId: String(import.meta.env.VITE_APPWRITE_BOOKS_COLLECTION_ID),
   appwritePurchasesCollectionId:String(import.meta.env.VITE_APPWRITE_PURCHASES_COLLECTION_ID),
   appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}


export default conf