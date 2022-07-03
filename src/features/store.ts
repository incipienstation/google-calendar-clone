import { configureStore } from "@reduxjs/toolkit";
import selectedDateReducer from "./selectedDate/selectedDateSlice";
import scrollPointReducer from "./scrollPoint/scrollPointSlice";
import eventDataReducer from "./eventData/eventDataSlice";
import selectedEventReducer from "./selectedEvent/selectedEventSlice";
import modalControlReducer from "./modalControl/modalControlSlice";
import timePickerControlReducer from "./timePickerControl/timePickerControlSlice";

export const store = configureStore({
  reducer: {
    selectedDate: selectedDateReducer,
    scrollPoint: scrollPointReducer,
    eventData: eventDataReducer,
    selectedEvent: selectedEventReducer,
    modalControl: modalControlReducer,
    timePickerControl: timePickerControlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
