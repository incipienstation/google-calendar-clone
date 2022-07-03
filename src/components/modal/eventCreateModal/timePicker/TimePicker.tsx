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
import { setDropdownType } from "../../../../features/timePickerControl/timePickerControlSlice";
import { useDispatch } from "react-redux";

const TimePicker = () => {
  const { event } = useSelector((state: RootState) => state.selectedEvent);
  const { dateTimeRange } = event!;
  const [startDateTime, endDateTime] = dateTimeRange;
  const {
    date: startDate,
    hour: startHour,
    minute: startMinute,
  } = startDateTime;
  const { date: endDate, hour: endHour, minute: endMinute } = startDateTime;
  const dispatch = useDispatch();

  useEffect(() => {
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
      <span aria-label=" - " style={{margin: "0 2px"}}>–</span>
      <Dropdown type="end" />
    </div>
  );
};

export default TimePicker;
