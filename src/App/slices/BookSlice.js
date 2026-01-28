import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import databaseService from "../../appwrite/database"
import authService from "../../appwrite/auth";
// 1️⃣ Fetch all books
export const fetchAllBooks = createAsyncThunk(
  "books/fetchAll",
  async (_,{rejectWithValue}) => {
  try { 
    

    const response = await databaseService.getAllBooks();
   console.log("🧪 RAW RESPONSE:", response);
       const genres = [...new Set(
      response.map(book => book.genre).filter(Boolean)
    )];
    
        return genres;
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


export const fetchBooksByGenre = createAsyncThunk(
  "books/fetchBooksByGenre",
  
  async ({ genre, limit = 6 }, { rejectWithValue }) => {
    try {
      

      const books = await databaseService.fetchBooksByGenre({ genre, limit });
      

      return { genre, books };
    } catch (error) {
       return rejectWithValue(error.message || "Failed to fetch books");
    }
  }
);

export const fetchUserBooksCount = createAsyncThunk(
  "books/fetchUserBooksCount",
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      const allBooks = await databaseService.getAllBooks();
     

      // ✅ Filter books by this user
      const userBooks = allBooks.filter(book => book.sellerid === user.$id);
         
      return userBooks.length;
      
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch user books count");
    }
  }
);



const bookSlice = createSlice({
  name: "books",
initialState: {
  booksByGenre: {}, 
  purchasedbooks:[],    // { History: [...], Science: [...] }
  genreLoading: {},     // { History: true }
  genres: [],
  isLoading:false,
  genresLoading: false,
  error: null,
  userBooksCount: 0, 
},
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 📥 Fetch books
      .addCase(fetchAllBooks.pending, (state) => {
        state.genresLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.genresLoading = false;
        state.genres = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.genresLoading = false;
        state.error = action.payload;
      })

      // ➕ Add book
      .addCase(addNewBook.pending,(state)=>{
        state.isLoading = true;
        state.error =  null;
      })
      .addCase(addNewBook.fulfilled, (state) => {
           state.isLoading = false;
           userBooksCount += 1;
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
      //fetch book by  genre 
.addCase(fetchBooksByGenre.pending, (state, action) => {
  const genre = action.meta.arg.genre;
  state.genreLoading[genre] = true;
  state.error = null;
})

.addCase(fetchBooksByGenre.fulfilled, (state, action) => {
  const { genre, books } = action.payload;
  state.booksByGenre[genre] = books;
  state.genreLoading[genre] = false;
})

.addCase(fetchBooksByGenre.rejected, (state, action) => {
  const genre = action.meta.arg.genre;
  state.genreLoading[genre] = false;
  state.error = action.payload;
})
     .addCase(fetchUserBooksCount.pending, (state) => {
    state.isLoading = true; // optional
    state.error = null;
  })
  .addCase(fetchUserBooksCount.fulfilled, (state, action) => {
    state.isLoading = false;
    state.userBooksCount = action.payload; // count update
  })
  .addCase(fetchUserBooksCount.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

      }
});

export default bookSlice.reducer;
