import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = { notifications: [] };

export const notifierSlice = createSlice({
  name: "notifier",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    enqueue: () => {},
    close: () => {},
    remove: () => {},
  },
});

export const notifierActions = notifierSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export const notifierReducer = notifierSlice.reducer;
