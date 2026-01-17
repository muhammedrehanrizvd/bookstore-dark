import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../appwrite/auth'

// Async Thunks - These handle API calls automatically

// 1. Signup new user
export const signup = createAsyncThunk(
    'auth/signup',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            // Create account
            await authService.createAccount({ email, password, name })
            // Get user data after signup
            const userData = await authService.getCurrentUser()
            return userData
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// 2. Login existing user
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            await authService.login({ email, password })
            const userData = await authService.getCurrentUser()
            return userData
        } catch (error) {
            return rejectWithValue(error.message || 'Login failed')
        }
    }
)

// 3. Check if user is already logged in (on app load)
export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const userData = await authService.getCurrentUser()
            return userData
        } catch (error) {
            return rejectWithValue(error.message || 'Not authenticated')
        }
    }
)

// 4. Logout user
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// The Slice - This is your state management
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,              // User data
        loading: false,          // Loading state
        error: null,             // Error messages
        isAuthenticated: false   // Is user logged in?
    },
    reducers: {
        // Manual action to clear errors
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // SIGNUP CASES
            .addCase(signup.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
            
            // LOGIN CASES
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isAuthenticated = false
            })
            
            // CHECK AUTH CASES
            .addCase(checkAuth.pending, (state) => {
                state.loading = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.isAuthenticated = Boolean(action.payload)
                state.error = null

            })
            .addCase(checkAuth.rejected, (state) => {
                state.user = null
                state.loading = false
                state.isAuthenticated = false
                state.error = action.payload;
            })
            
            // LOGOUT CASES
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null
                state.loading = false
                state.isAuthenticated = false
                state.error = null
            })
    }
})

export const { clearError } = authSlice.actions
export default authSlice.reducer