import "./Dropdown.styles.scss";
import { RefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  DateTime,
  dateTimeToString,
} from "../../../features/eventData/eventDataSlice";
import { RootState } from "../../../features/store";
import {
  closeDropdowns,
  DropdownType,
  setDropdownType,
  setTimeInterval,
} from "../../../features/timePickerControl/timePickerControlSlice";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import {
  addTimeInterval,
  setSelectedEventEndDate,
  setSelectedEventStartDate,
} from "../../../features/selectedEvent/selectedEventSlice";

const Dropdown = ({ type }: { type: DropdownType }) => {
  const { dropdownType } = useSelector(
    (state: RootState) => state.timePickerControl
  );
  const { event } = useSelector((state: RootState) => state.selectedEvent);
  const [startDateTime, endDateTime] = event!.dateTimeRange;
  const dateTime = type === "start" ? startDateTime : endDateTime;
  const dispatch = useDispatch();
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const { timeInterval } = useSelector(
    (state: RootState) => state.timePickerControl
  );

  const handleClickOutside = () => {
    dispatch(closeDropdowns());
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleClickButton = () => {
    dispatch(setDropdownType(type));
  };

  const handleClickStartTime = (startDateTime: DateTime) => {
    console.log(timeInterval);
    const endDateTime: DateTime = addTimeInterval(startDateTime, timeInterval);
    dispatch(setSelectedEventStartDate(startDateTime));
    dispatch(setSelectedEventEndDate(endDateTime));
    dispatch(closeDropdowns());
  };

  const handleClickEndTime = (endDateTime: DateTime, timeInterval: number) => {
    dispatch(setTimeInterval(timeInterval));
    console.log(timeInterval);
    dispatch(setSelectedEventEndDate(endDateTime));
    dispatch(closeDropdowns());
  };

  const timeIntervalToString = (minute: number): string => {
    return minute < 60 ? `(${minute}분)` : `(${minute / 60}시간)`;
  };

  const dropdownBuilder =
    dropdownType === type ? (
      <div ref={ref} className="drop-down__body">
        {Array(type === "start" ? 4 * 24 : 4 + 2 * 23)
          .fill(0)
          .map((v, i) =>
            type === "start" ? 15 * i : i < 4 ? 15 * i : 60 + 30 * (i - 4)
          )
          .map((v) => {
            const tempDateTime: DateTime = addTimeInterval(
              type === "start"
                ? { date: startDateTime.date, hour: 0, minute: 0 }
                : startDateTime,
              v
            );

            return (
              <div
                key={v.toString()}
                className="drop-down__element"
                onClick={() => {
                  type === "start"
                    ? handleClickStartTime(tempDateTime)
                    : handleClickEndTime(tempDateTime, v);
                }}
              >
                {type === "start"
                  ? dateTimeToString(tempDateTime)
                  : dateTimeToString(tempDateTime) + timeIntervalToString(v)}
              </div>
            );
          })}
      </div>
    ) : null;

  return (
    <div
      className={
        dateTimeToString(dateTime).length < 8
          ? "drop-down"
          : "drop-down drop-down-expand"
      }
    >
      <div
        onClick={handleClickButton}
        className={
          dropdownType === type
            ? "drop-down__btn drop-down__btn-selected"
            : "drop-down__btn"
        }
        tabIndex={-1}
      >
        {dateTimeToString(dateTime)}
      </div>
      <div>{dropdownBuilder}</div>
    </div>
  );
};

export default Dropdown;
