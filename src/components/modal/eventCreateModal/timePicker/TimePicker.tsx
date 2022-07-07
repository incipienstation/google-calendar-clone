import "./TimePicker.styles.scss";
import { useSelector } from "react-redux";
import {
  DateTime,
  dateTimeToString,
  dayList,
} from "../../../../features/eventData/eventDataSlice";
import { RootState } from "../../../../features/store";
import TimePickerDropdown from "../../../common/dropdown/TimePickerDropdown";
import { useEffect, useState } from "react";
import { resetTimeInterval } from "../../../../features/timePickerControl/timePickerControlSlice";
import { useDispatch } from "react-redux";
import { compareSelectedDate } from "../../../../features/selectedDate/selectedDateSlice";
import RepeatTypeDropdown from "../../../common/dropdown/RepeatTypeDropdown";

const TimePicker = () => {
  const { event } = useSelector((state: RootState) => state.selectedEvent);
  const { dateTimeRange } = event!;
  const [startDateTime, endDateTime] = dateTimeRange;
  const { date: startDate } = startDateTime;
  const { date: endDate } = endDateTime;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetTimeInterval());
  }, []);

  return (
    <div className="time-picker">
      <div className="time-picker__date">{`${startDate.month}월 ${
        startDate.date
      }일 (${dayList[startDate.day]}요일)`}</div>
      <TimePickerDropdown type="start-time" />
      <span aria-label=" - ">–</span>
      <TimePickerDropdown type="end-time" />
      {compareSelectedDate(startDate, endDate) !== 0 ? (
        <div className="time-picker__date">{`${endDate.month}월 ${
          endDate.date
        }일 (${dayList[endDate.day]}요일)`}</div>
      ) : null}
    </div>
  );
};

export default TimePicker;
