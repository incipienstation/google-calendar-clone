import "./TimePicker.styles.scss";
import { useSelector } from "react-redux";
import {
  DateTime,
  dateTimeToString,
  dayList,
} from "../../../../features/eventData/eventDataSlice";
import { RootState } from "../../../../features/store";
import Dropdown from "../../../common/dropdown/Dropdown";
import { useEffect, useState } from "react";
import { resetTimeInterval, setDropdownType } from "../../../../features/timePickerControl/timePickerControlSlice";
import { useDispatch } from "react-redux";
import { compareSelectedDate } from "../../../../features/selectedDate/selectedDateSlice";

const TimePicker = () => {
  const { event } = useSelector((state: RootState) => state.selectedEvent);
  const { dateTimeRange } = event!;
  const [startDateTime, endDateTime] = dateTimeRange;
  const { date: startDate } = startDateTime;
  const { date: endDate } = endDateTime;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetTimeInterval())
    return () => {
      dispatch(setDropdownType(undefined));
    };
  }, []);

  return (
    <div className="time-picker">
      <div className="time-picker__date">{`${startDate.month}월 ${
        startDate.date
      }일 (${dayList[startDate.day]}요일)`}</div>
      <Dropdown type="start" />
      <span aria-label=" - ">–</span>
      <Dropdown type="end" />
      {compareSelectedDate(startDate, endDate) !== 0 ? (
        <div className="time-picker__date">{`${endDate.month}월 ${
          endDate.date
        }일 (${dayList[endDate.day]}요일)`}</div>
      ) : null}
    </div>
  );
};

export default TimePicker;
