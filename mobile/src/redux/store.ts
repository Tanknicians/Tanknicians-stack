import servicecallClientTankReducer from './slices/forms/servicecallTankSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/auth/authSlice';
import { apiSlice } from './api/apiSlice';

const persistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  auth: authReducer,
  servicecallClientTank: servicecallClientTankReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware),
  devTools: true
});

export const persistor = persistStore(store);
setupListeners(store.dispatch); // NOTE this addition

export type RootState = ReturnType<typeof store.getState>;
