import { createSlice } from "@reduxjs/toolkit";
import {
  DateTime,
  Event,
  parseDateTimeToDate,
  parseDateToDateTime,
  RepeatType,
} from "../eventData/eventDataSlice";

const initialState: { event: Event | null } = { event: null };

export const selectedEventSlice = createSlice({
  name: "selectedEvent",
  initialState,
  reducers: {
    setSelectedEvent: (state, action: { payload: { event: Event } }) => {
      state.event = action.payload.event;
    },
    deleteSelectedEvent: (state) => {
      state.event = null;
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
    setRepeatType: (state, action: { payload: RepeatType | undefined }) => {
      state.event!.repeat = action.payload;
    },
  },
});

export const {
  setSelectedEvent,
  deleteSelectedEvent,
  setSelectedEventTitle,
  setSelectedEventStartDate,
  setSelectedEventEndDate,
  setRepeatType,
} = selectedEventSlice.actions;

export default selectedEventSlice.reducer;

export const addTimeInterval = (
  dateTime: DateTime,
  timeInterval: number
): DateTime => {
  const res: Date = parseDateTimeToDate(dateTime);
  res.setMinutes(res.getMinutes() + timeInterval);
  return parseDateToDateTime(res);
};

export const getTimeInterval = (
  startDateTime: DateTime,
  endDateTime: DateTime
): number => {
  return Math.abs(
    Math.round(
      (parseDateTimeToDate(endDateTime).getTime() -
        parseDateTimeToDate(startDateTime).getTime()) /
        1000 /
        60
    )
  );
};
