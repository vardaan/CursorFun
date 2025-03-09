import {configureStore} from '@reduxjs/toolkit';
import habitReducer from './habitSlice';
import {persistenceMiddleware} from './middleware/persistenceMiddleware';

export const store = configureStore({
  reducer: {
    habits: habitReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(persistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
