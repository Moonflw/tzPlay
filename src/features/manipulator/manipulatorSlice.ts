import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Position = { x: number; y: number };

type ManipulatorState = {
  position: Position;
  holding: boolean;
  speed: number;
};

const initialState: ManipulatorState = {
  position: { x: 0, y: 0 },
  holding: false,
  speed: 500,
};

const manipulatorSlice = createSlice({
  name: "manipulator",
  initialState,
  reducers: {
    setPosition(state, action: PayloadAction<Position>) {
      state.position = action.payload;
    },
    resetPosition(state) {
      state.position = { x: 0, y: 0 };
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
    setHolding: (state, action: PayloadAction<boolean>) => {
      state.holding = action.payload;
    },
  },
});

export const { setPosition, resetPosition, setSpeed, setHolding } =
  manipulatorSlice.actions;
export default manipulatorSlice.reducer;
