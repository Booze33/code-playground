import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiURL = 'http://localhost:3001/auth';

export const setUser = (userData) => ({
  type: 'auth/setUser',
  payload: userData,
});

export const clearUser = () => ({
  type: 'auth/clearUser',
});

export const signUp = createAsyncThunk('auth/signUp', async (userData) => {
  try {
    const response = await axios.post(`${apiURL}/`, userData);

    if (response.status === 200) {
      const { data } = response.data;
      const headers = {
        'access-token': response.headers['access-token'],
        client: response.headers.client,
      };
      toast.success(`Welcome, ${data.full_name}`);

      return { data, headers };
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    toast.error(
      'Registration failed. Please check your information and try again.',
    );
    throw error;
  }
});

export const signIn = createAsyncThunk('auth/signIn', async (credentials) => {
  try {
    const response = await axios.post(`${apiURL}/sign_in`, credentials);

    if (response.status === 200) {
      const { data } = response.data;
      const headers = {
        'access-token': response.headers['access-token'],
        client: response.headers.client,
      };

      toast.success(`Welcome, ${data.full_name}`);
      return { data, headers };
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    toast.error(
      'Sign-in failed. Please check your credentials and try again.',
    );
    throw error;
  }
});

export const signOut = createAsyncThunk('auth/signOut', async (_, { getState }) => {
  try {
    const state = getState();
    const { user } = state.auth;

    if (!user) {
      localStorage.clear();
      return null;
    }

    const client = localStorage.getItem('client');
    const accessToken = localStorage.getItem('access-token');

    if (!client || !accessToken) {
      localStorage.clear();
      return null;
    }

    const headers = {
      'access-token': accessToken,
      client,
      uid: user.data.uid,
    };

    await axios.delete(`${apiURL}/sign_out`, { headers });

    localStorage.clear();
    return null;
  } catch (error) {
    toast.error('Sign-out failed. Please try again.');
    throw error;
  }
});

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('sessionUID', action.payload.data.uid);
        localStorage.setItem('client', action.payload.headers.client);
        localStorage.setItem('access-token', action.payload.headers['access-token']);
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('sessionUID', action.payload.data.uid);
        localStorage.setItem('client', action.payload.headers.client);
        localStorage.setItem('access-token', action.payload.headers['access-token']);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.clear();
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;