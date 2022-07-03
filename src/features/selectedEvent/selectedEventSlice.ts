import { createSlice } from "@reduxjs/toolkit";
import { DateTime, Event } from "../eventData/eventDataSlice";
import {
  parseDateToSelectedDate,
  parseSelectedDateToDate,
} from "../selectedDate/selectedDateSlice";
import { DropdownType } from "../timePickerControl/timePickerControlSlice";

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
    updateSelectedEvent: (
      state,
      action: { payload: { startDateTime: DateTime; timeInterval: number } }
    ) => {
      const newState = { ...state };
      newState.event!.dateTimeRange[0] = action.payload.startDateTime;
      const res = addTimeInterval(
        action.payload.startDateTime,
        action.payload.timeInterval
      );
      newState.event!.dateTimeRange[1] = {
        date: parseDateToSelectedDate(res),
        hour: res.getHours(),
        minute: res.getMinutes(),
      };
      state = newState;
    },
  },
});

export const {
  setSelectedEvent,
  deleteSelectedEvent,
  setSelectedEventTitle,
  updateSelectedEvent,
} = selectedEventSlice.actions;

export default selectedEventSlice.reducer;

export const addTimeInterval = (
  dateTime: DateTime,
  timeInterval: number
): Date => {
  const res: Date = parseSelectedDateToDate(dateTime.date);
  res.setHours(dateTime.hour);
  res.setMinutes(dateTime.minute);
  res.setMinutes(res.getMinutes() + timeInterval);
  return res;
};
