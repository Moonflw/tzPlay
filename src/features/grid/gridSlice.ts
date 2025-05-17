import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// type Cell = {
//   hasSample: boolean;
// };

export interface GridState {
  rows: number;
  cols: number;
  samples: [number, number][];
  manipulatorPosition: [number, number];
}

const initialState: GridState = {
  rows: 5,
  cols: 5,
  samples: [],
  manipulatorPosition: [0, 0],
};

const generateRandomSamples = (
  rows: number,
  cols: number,
  count: number
): [number, number][] => {
  const samples = new Set<string>();

  while (samples.size < count) {
    const x = Math.floor(Math.random() * cols);
    const y = Math.floor(Math.random() * rows);
    if (!(x === 0 && y === 0)) {
      samples.add(`${x},${y}`);
    }
  }

  return Array.from(samples).map(
    (s) => s.split(",").map(Number) as [number, number]
  );
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    generateSamples(state, action: PayloadAction<number>) {
      state.samples = generateRandomSamples(
        state.rows,
        state.cols,
        action.payload
      );
    },
    resetManipulator(state) {
      state.manipulatorPosition = [0, 0];
    },
    addSample: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      state.samples.push([x, y]);
    },
    removeSample: (state, action: PayloadAction<{ x: number; y: number }>) => {
      const { x, y } = action.payload;
      state.samples = state.samples.filter(([sx, sy]) => sx !== x || sy !== y);
    },
  },
});

export const { generateSamples, resetManipulator, addSample, removeSample } =
  gridSlice.actions;
export default gridSlice.reducer;
