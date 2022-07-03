import { createSlice } from "@reduxjs/toolkit";

export type DropdownType = "start" | "end" | undefined;

export type TimePickerControl = {
  dropdownType: DropdownType;
};

const initialState: TimePickerControl = {
  dropdownType: undefined,
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
  },
});

export const { setDropdownType, closeDropdowns } = timePickerControlSlice.actions;

export default timePickerControlSlice.reducer;
