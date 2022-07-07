import "./Dropdown.styles.scss";
import { RefObject, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RepeatType } from "../../../features/eventData/eventDataSlice";
import { setRepeatType } from "../../../features/selectedEvent/selectedEventSlice";
import { RootState } from "../../../features/store";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const RepeatTypeDropdown = () => {
  const { event } = useSelector((state: RootState) => state.selectedEvent);
  const dispatch = useDispatch();
  const ref: RefObject<HTMLDivElement> = useRef(null);
  const [enabled, setEnabled] = useState<boolean>(false);

  const handleClickOutside = () => {
    setEnabled(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleClickButton = () => {
    setEnabled(true);
  };

  const repeatTypeList: (RepeatType | undefined)[] = [
    undefined,
    "every-day",
    "every-week",
    "every-month",
    "every-year",
  ];

  const repeatTypeToText = (type: RepeatType | undefined): string => {
    return type === "every-day"
      ? "매일"
      : type === "every-week"
      ? "매주"
      : type === "every-month"
      ? "매월"
      : type === "every-year"
      ? "매년"
      : "반복 안함";
  };

  const dropdownBuilder = enabled ? (
    <div ref={ref} className="drop-down__body">
      {repeatTypeList.map((repeatType, i) => {
        return (
          <div
            key={i.toString()}
            className="drop-down__element"
            onClick={() => {
              dispatch(setRepeatType(repeatType));
              setEnabled(false)
            }}
          >
            {repeatTypeToText(repeatType)}
          </div>
        );
      })}
    </div>
  ) : null;

  return (
    <div className="drop-down drop-down-repeat-type">
      <div
        onClick={handleClickButton}
        className={
          enabled ? "drop-down__btn drop-down__btn-selected" : "drop-down__btn"
        }
        tabIndex={-1}
      >
        {repeatTypeToText(event?.repeat)}
      </div>
      <div>{dropdownBuilder}</div>
    </div>
  );
};

export default RepeatTypeDropdown;
