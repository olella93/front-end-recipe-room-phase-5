import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, signupAPI, getProfileAPI, updateProfileAPI, uploadProfileImageAPI } from './authAPI';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  return await loginAPI(credentials);
});

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  return await signupAPI(userData);
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
  return await getProfileAPI();
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (updates) => {
  return await updateProfileAPI(updates);
});

export const uploadProfileImage = createAsyncThunk('auth/uploadProfileImage', async (file) => {
  return await uploadProfileImageAPI(file);
});

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profile_image = action.payload.profile_image;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
