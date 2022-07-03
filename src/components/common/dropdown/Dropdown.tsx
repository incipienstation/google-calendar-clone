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
} from "../../../features/timePickerControl/timePickerControlSlice";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { setSelectedEventStart } from "../../../features/selectedEvent/selectedEventSlice";

const Dropdown = ({ type }: { type: DropdownType }) => {
  const { dropdownType } = useSelector(
    (state: RootState) => state.timePickerControl
  );
  const { event } = useSelector((state: RootState) => state.selectedEvent);
  const [startDateTime, endDateTime] = event!.dateTimeRange;
  const dateTime = type === "start" ? startDateTime : endDateTime;
  const dispatch = useDispatch();
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const [isClosable, setIsClosable] = useState(false);

  const handleClickOutside = () => {
    if (isClosable) {
      dispatch(closeDropdowns());
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleClickButton = () => {
    dispatch(setDropdownType(type));
  };

  const handleClickTime = (dateTime: DateTime) => {
    console.log(dateTime);
    dispatch(setSelectedEventStart(dateTime));
    setIsClosable(true);
  };

  const timeIntervalToString = (minute: number): string => {
    return minute < 60 ? `(${minute}분)` : `(${minute / 60}시간)`;
  };

  const addTime = () => {};

  const dropdownBuilder =
    dropdownType === type ? (
      <div className="drop-down__body">
        {Array(type === "start" ? 4 * 24 : 4 + 2 * 23)
          .fill(0)
          .map((v, i) =>
            type === "start" ? 15 * i : i < 4 ? 15 * i : 60 + 30 * (i - 4)
          )
          .map((v) => {
            const tempDateTime = {
              date: dateTime.date,
              hour: Math.floor(v / 60),
              minute: v % 60,
            };

            return type === "start" ? (
              <div
                key={v.toString()}
                className="drop-down__element"
                onMouseDown={() => setIsClosable(false)}
                onClick={() => {
                  console.log("clicked");
                  handleClickTime(tempDateTime);
                }}
              >
                {dateTimeToString(tempDateTime)}
              </div>
            ) : (
              <div key={v.toString()} className="drop-down__element">
                {timeIntervalToString(v)}
              </div>
            );
          })}
      </div>
    ) : null;

  return (
    <div className="drop-down">
      <div
        ref={ref}
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
