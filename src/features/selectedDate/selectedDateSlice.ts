import { createSlice } from "@reduxjs/toolkit";

export type SelectedDate = {
  year: number;
  month: number;
  date: number;
  day: number;
  currWeek?: SelectedDate[];
  currMonth?: SelectedDate[];
};

const today = new Date();

const getCurrWeek = (selectedDate: Date): SelectedDate[] => {
  const offset: number = selectedDate.getDay();
  return Array(7)
    .fill(0)
    .map((v, i): SelectedDate => {
      const tempDate: Date = new Date(selectedDate);
      tempDate.setDate(selectedDate.getDate() - offset + i);
      return {
        year: tempDate.getFullYear(),
        month: tempDate.getMonth() + 1,
        date: tempDate.getDate(),
        day: tempDate.getDay(),
      };
    });
};

const initialState: SelectedDate = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  date: today.getDate(),
  day: today.getDay(),
  currWeek: getCurrWeek(today),
};

export const selectedDateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setSelectedDate: (state, action: { payload: SelectedDate }) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
      state.date = action.payload.date;
      state.day = action.payload.day;
      state.currWeek = getCurrWeek(parseSelectedDateToDate(action.payload));
    },
  },
});

export const { setSelectedDate } = selectedDateSlice.actions;

export default selectedDateSlice.reducer;

export const dateToString = (date: SelectedDate): string =>
  `${date.year}-${date.month}-${date.date}`;

export const parseSelectedDateToDate = (selectedDate: SelectedDate): Date =>
  new Date(selectedDate.year, selectedDate.month - 1, selectedDate.date);

export const parseDateToSelectedDate = (date: Date): SelectedDate => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  date: date.getDate(),
  day: date.getDay(),
});

export const getYesterday = (today: SelectedDate) => {
  const res: Date = parseSelectedDateToDate(today);
  res.setDate(res.getDate() - 1);
  return parseDateToSelectedDate(res);
};

export const compareSelectedDate = (
  o1: SelectedDate,
  o2: SelectedDate
): number => {
  const startDate = parseInt(
    o1.year.toString() +
      o1.month.toString().padStart(2, "0") +
      o1.date.toString().padStart(2, "0")
  );
  const endDate = parseInt(
    o2.year.toString() +
      o2.month.toString().padStart(2, "0") +
      o2.date.toString().padStart(2, "0")
  );
  return startDate < endDate ? -1 : startDate === endDate ? 0 : 1;
};
