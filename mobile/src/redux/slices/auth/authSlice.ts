import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState = {
  user: {
    id: -1,
    email: '',
    role: '',
    userId: -1
  },
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.token = null;
    }
  }
});

export const { setCredentials, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
