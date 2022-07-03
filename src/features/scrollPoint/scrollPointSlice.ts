import { createSlice } from "@reduxjs/toolkit";

export type ScrollPoint = {
  scrollX: number;
  scrollY: number;
};

const initialState: ScrollPoint = {
  scrollX: 0,
  scrollY: 0,
};

export const scrollPointSlice = createSlice({
  name: "scrollPoint",
  initialState,
  reducers: {
    setScrollPoint: (state, action: { payload: ScrollPoint }) => {
      state.scrollX = action.payload.scrollX;
      state.scrollY = action.payload.scrollY;
    },
  },
});

export const { setScrollPoint } = scrollPointSlice.actions;

export default scrollPointSlice.reducer;
