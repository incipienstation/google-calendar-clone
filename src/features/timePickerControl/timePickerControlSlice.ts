import { createSlice } from "@reduxjs/toolkit";

export type DropdownType = "start" | "end" | undefined;

export type TimePickerControl = {
  dropdownType: DropdownType;
  timeInterval: number;
};

const initialState: TimePickerControl = {
  dropdownType: undefined,
  timeInterval: 60,
};

export const timePickerControlSlice = createSlice({
  name: "timePickerControl",
  initialState,
  reducers: {
    setDropdownType: (state, action: { payload: DropdownType }) => {
      state.dropdownType = action.payload;
    },
    closeDropdowns: (state) => {
      state.dropdownType = undefined;
    },
    setTimeInterval: (state, action: { payload: number }) => {
      state.timeInterval = action.payload;
    },
    resetTimeInterval: (state) => {
      state.timeInterval = initialState.timeInterval;
    },
  },
});

export const { setDropdownType, closeDropdowns, setTimeInterval, resetTimeInterval } =
  timePickerControlSlice.actions;

export default timePickerControlSlice.reducer;
