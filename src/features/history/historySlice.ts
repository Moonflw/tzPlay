import { createSlice  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export type HistoryItem = {
  original: string;
  optimized: string;
  timestamp: string;
  samplesBefore: [number, number][];
  samplesAfter: [number, number][];
};

type HistoryState = {
  items: HistoryItem[];
};

const initialState: HistoryState = {
  items: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryItem(state, action: PayloadAction<HistoryItem>) {
      state.items.unshift(action.payload); 
    },
    clearHistory(state) {
      state.items = [];
    },
  },
});

export const { addHistoryItem, clearHistory } = historySlice.actions;
export default historySlice.reducer;
