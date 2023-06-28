import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from './slices/auth/authSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware),
  devTools: true
});

export const persistor = persistStore(store);
setupListeners(store.dispatch); // NOTE this addition

export type RootState = ReturnType<typeof store.getState>;
