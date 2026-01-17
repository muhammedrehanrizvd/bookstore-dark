import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storageService from "../../appwrite/storage";

// ========================================
// ASYNC THUNKS
// ========================================

// Upload file
export const uploadFile = createAsyncThunk(
  "bucket/upload",
  async (file, { rejectWithValue }) => {
    try {
      const uploadedFile = await storageService.uploadFile(file);
      
      // ✅ OPTIMIZED: Return both file and preview URL together
      return {
        file: uploadedFile,
        previewUrl: storageService.getFilePreview(uploadedFile.$id)
      };
    } catch (error) {
      return rejectWithValue(error.message || "File upload failed");
    }
  }
);



const bucketSlice = createSlice({
  name: "bucket",
  initialState: {
    uploadedFile: null,
    previewUrl: null,
    loading: false,        // ✅ SIMPLIFIED: One loading state
    error: null
  },
  reducers: {
    // Clear all bucket state
    resetBucket: (state) => {
      state.uploadedFile = null;
      state.previewUrl = null;
      state.error = null;
    },
    
    // ✅ NEW: Clear just the error
    clearError: (state) => {
      state.error = null;
    },
    
    // ✅ NEW: Set preview URL manually (for existing files)
    setPreviewUrl: (state, action) => {
      state.previewUrl = storageService.getFilePreview(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // ========================================
      // UPLOAD FILE
      // ========================================
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadedFile = action.payload.file;      // ✅ Save file info
        state.previewUrl = action.payload.previewUrl;  // ✅ Save preview URL
        state.error = null;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // ✅ FIXED: No fallback needed
      })

      
  }
});

export const { resetBucket, clearError, setPreviewUrl } = bucketSlice.actions;
export default bucketSlice.reducer;