import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import databaseService from "../appwrite/database";

// 1️⃣ Fetch all books
export const fetchAllBooks = createAsyncThunk(
  "books/fetchAll",
  async (_,{rejectWithValue}) => {
  try { 
    const response = await databaseService.getAllBooks();
    return response.documents;
   }
   catch(error){
     return rejectWithValue("Book fetching problem");
   }
  }
);

// 2️⃣ Add new book
export const addNewBook = createAsyncThunk(
  "books/add",
  async (bookData,{rejectWithValue}) => {
     try {
        return await databaseService.addBook(bookData);
    }
     catch(error){
        return rejectWithValue("failed: try agin");
     }
  }
);

export const userpurchasedbooks = createAsyncThunk(
    'books/purchasebook',
    async (_,{rejectWithValue})=>{
       try { 
         return  await databaseService. getUserPurchases()
         }
         catch(error){
            return rejectWithValue(error)
         }
    }
)
export  const addpurchasebook = createAsyncThunk(
    'books/addpurchase',
    async (book,{rejectWithValue})=>{
        try{
            return await databaseService.createPurchase(book);
        }
        catch(error){
              return rejectWithValue('failed');
        }
    }
)


const bookSlice = createSlice({
  name: "books",
  initialState: {
    addbooks: [],
    purchasedbooks:[],
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 📥 Fetch books
      .addCase(fetchAllBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addbooks = action.payload;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ➕ Add book
      .addCase(addNewBook.pending,(state)=>{
        state.isLoading = true;
        state.error =  null;
      })
      .addCase(addNewBook.fulfilled, (state) => {
           state.isLoading = false;
      })
      .addCase(addNewBook.rejected,(state,action)=>{
           state.isLoading = false;
           state.error = action.payload;
      })
      //fetchpurchasebook
      .addCase(userpurchasedbooks.pending,(state)=>{
                state.isLoading = true;
                state.error = null;
      })
      .addCase(userpurchasedbooks.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.purchasedbooks = action.payload;
      })
      .addCase(userpurchasedbooks.rejected,(state,action)=>{
             state.isLoading = false;
             state.error = action.payload;
      })
      //addpurchasedbook
      .addCase(addpurchasebook.pending,(state)=>{
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addpurchasebook.fulfilled, (state)=>{
        state.isLoading = false ;
      })
      .addCase(addpurchasebook.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export default bookSlice.reducer;
