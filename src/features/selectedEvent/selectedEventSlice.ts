import { createSlice } from "@reduxjs/toolkit";
import { DateTime, Event } from "../eventData/eventDataSlice";
import {
  parseDateToSelectedDate,
  parseSelectedDateToDate,
} from "../selectedDate/selectedDateSlice";

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
    setSelectedEventStartDate: (state, action: { payload: DateTime }) => {
      state.event!.dateTimeRange[0] = action.payload;
    },
    setSelectedEventEndDate: (state, action: { payload: DateTime }) => {
      state.event!.dateTimeRange[1] = action.payload;
    },
  },
});

export const {
  setSelectedEvent,
  deleteSelectedEvent,
  setSelectedEventTitle,
  setSelectedEventStartDate,
  setSelectedEventEndDate,
} = selectedEventSlice.actions;

export default selectedEventSlice.reducer;

export const addTimeInterval = (
  dateTime: DateTime,
  timeInterval: number
): DateTime => {
  const res: Date = parseSelectedDateToDate(dateTime.date);
  res.setHours(dateTime.hour);
  res.setMinutes(dateTime.minute);
  res.setMinutes(res.getMinutes() + timeInterval);
  return {
    date: parseDateToSelectedDate(res),
    hour: res.getHours(),
    minute: res.getMinutes(),
  };
};
