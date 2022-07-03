import { createSlice } from "@reduxjs/toolkit";
import { DateTime, Event } from "../eventData/eventDataSlice";

const initialState: { event?: Event } = {};

export const selectedEventSlice = createSlice({
  name: "selectedEvent",
  initialState,
  reducers: {
    setSelectedEvent: (state, action: { payload: { event: Event } }) => {
      state.event = action.payload.event;
      console.log(state.event);
    },
    deleteSelectedEvent: (state) => {
      state.event = undefined;
    },
    setSelectedEventTitle: (state, action: { payload: string }) => {
      state.event!.title =
        action.payload === "" ? "(제목 없음)" : action.payload;
    },
    setSelectedEventStart: (state, action: { payload: DateTime }) => {
      const newState = {...state}
      newState.event!.dateTimeRange[0] = action.payload
      state = newState
    },
    setSelectedEventEnd: (state, action: { payload: DateTime }) => {
      const newState = {...state.event!}
      newState.dateTimeRange[1] = action.payload
      state.event = newState
    },
  },
});

export const {
  setSelectedEvent,
  deleteSelectedEvent,
  setSelectedEventTitle,
  setSelectedEventStart,
  setSelectedEventEnd,
} = selectedEventSlice.actions;

export default selectedEventSlice.reducer;
