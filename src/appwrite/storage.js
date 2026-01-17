import conf from './config.js'
import { Client, ID, Storage } from "appwrite"

export class StorageService {
    client = new Client()
    bucket

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.bucket = new Storage(this.client)
    }

    async uploadFile({file}) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite storage :: uploadFile :: error", error)
            throw error
        }
    }
   async getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
            
        )
    }


    async
}
const storageservice = new StorageService();
export default storageservice;