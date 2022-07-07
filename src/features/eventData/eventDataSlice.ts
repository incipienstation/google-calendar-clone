import { createSlice } from "@reduxjs/toolkit";
import {
  parseDateToSelectedDate,
  parseSelectedDateToDate,
  SelectedDate,
} from "../selectedDate/selectedDateSlice";

export type DateTime = {
  date: SelectedDate;
  hour: number;
  minute: number;
};

export type DateTimeRange = [DateTime, DateTime];

export type RepeatType =
  | "every-day"
  | "every-week"
  | "every-month"
  | "every-year";

export type Event = {
  id: string;
  title: string;
  dateTimeRange: DateTimeRange;
  isNew?: boolean;
  repeat?: RepeatType;
};

const initialState: { eventData: Event[] } = {
  eventData: JSON.parse(localStorage.getItem("eventData")!) || [],
};

export const eventDataSlice = createSlice({
  name: "eventData",
  initialState,
  reducers: {
    createEvent: (
      state,
      action: {
        payload: Event;
      }
    ) => {
      const newEvent: Event = { ...action.payload };
      newEvent.id = new Date().toISOString();
      newEvent.isNew = undefined;
      state.eventData = [...state.eventData, newEvent];
      localStorage.setItem("eventData", JSON.stringify(state.eventData));
    },
    deleteEvent: (state, action: { payload: string }) => {
      state.eventData = [...state.eventData].filter(
        (v: Event) => v.id !== action.payload
      );
      localStorage.setItem("eventData", JSON.stringify(state.eventData));
    },
  },
});

export const { createEvent, deleteEvent } = eventDataSlice.actions;

export default eventDataSlice.reducer;

export const parseDateTimeToDate = (dateTime: DateTime): Date => {
  const res: Date = parseSelectedDateToDate(dateTime.date);
  res.setHours(dateTime.hour);
  res.setMinutes(dateTime.minute);
  return res;
};

export const parseDateToDateTime = (date: Date): DateTime => {
  const res: SelectedDate = parseDateToSelectedDate(date);
  return { date: res, hour: date.getHours(), minute: date.getMinutes() };
};

export const dateTimeToString = (dateTime: DateTime): string => {
  const type: string =
    dateTime.hour < 12 || dateTime.hour === 24 ? "오전" : "오후";
  const hourString: string =
    dateTime.hour % 12 === 0 ? "12" : (dateTime.hour % 12).toString();
  const minuteString: string = dateTime.minute.toString().padStart(2, "0");
  return type + " " + hourString + ":" + minuteString;
};

export const dateTimeRangeToString = (dateTimeRange: DateTimeRange): string => {
  const [startDateTime, endDateTime] = dateTimeRange;
  const startType: string =
    startDateTime.hour < 12 || startDateTime.hour === 24 ? "오전" : "오후";
  const endType: string =
    endDateTime.hour < 12 || endDateTime.hour === 24 ? "오전" : "오후";
  const startHourString: string =
    startDateTime.hour % 12 === 0 ? "12" : (startDateTime.hour % 12).toString();
  const endHourString: string =
    endDateTime.hour % 12 === 0 ? "12" : (endDateTime.hour % 12).toString();
  const startMinuteString: string =
    startDateTime.minute === 0
      ? "시"
      : ":" + startDateTime.minute.toString().padStart(2, "0");
  const endMinuteString: string =
    endDateTime.minute === 0
      ? "시"
      : ":" + endDateTime.minute.toString().padStart(2, "0");
  return startType === endType
    ? startType +
        " " +
        startHourString +
        startMinuteString +
        "~ " +
        endHourString +
        endMinuteString
    : startType +
        " " +
        startHourString +
        startMinuteString +
        "~" +
        endType +
        " " +
        endHourString +
        endMinuteString;
};

export const dayList: string[] = ["일", "월", "화", "수", "목", "금", "토"];
