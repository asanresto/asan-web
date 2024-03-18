import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "..";

// Define a type for the slice state
type BooleanState = Record<string, boolean | undefined>;

// Define the initial state using that type
const initialState: BooleanState = {};

export const booleanSlice = createSlice({
  name: "boolean",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    on: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    off: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
    },
    toggle: (state, action: PayloadAction<string>) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const booleanActions = booleanSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export const booleanReducer = booleanSlice.reducer;
