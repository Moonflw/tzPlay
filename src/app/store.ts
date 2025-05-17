import { configureStore } from '@reduxjs/toolkit';
import gridReducer from '../features/grid/gridSlice';
import historyReducer from '../features/history/historySlice';
import authReducer from '../features/auth/authSlice'; // <-- новый импорт
import manipulatorReducer from '../features/manipulator/manipulatorSlice';
export const store = configureStore({
  reducer: {
    grid: gridReducer,
    history: historyReducer,
    auth: authReducer, 
    manipulator: manipulatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
