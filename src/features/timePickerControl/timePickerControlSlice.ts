import { createSlice } from "@reduxjs/toolkit";

export type DropdownType = "start-time" | "end-time" | "repeat-type" | undefined;

export type TimePickerControl = {
  timeInterval: number;
};

const initialState: TimePickerControl = {
  timeInterval: 60,
};

export const timePickerControlSlice = createSlice({
  name: "timePickerControl",
  initialState,
  reducers: {
    setTimeInterval: (state, action: { payload: number }) => {
      state.timeInterval = action.payload;
    },
    resetTimeInterval: (state) => {
      state.timeInterval = initialState.timeInterval;
    },
  },
});

export const { setTimeInterval, resetTimeInterval } =
  timePickerControlSlice.actions;

export default timePickerControlSlice.reducer;
