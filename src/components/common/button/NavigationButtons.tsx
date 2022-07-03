import { useSelector, useDispatch } from "react-redux";
import {
  parseDateToSelectedDate,
  parseSelectedDateToDate,
  setSelectedDate,
} from "../../../features/selectedDate/selectedDateSlice";
import { RootState } from "../../../features/store";
import "./Button.styles.scss";

type NavigationType = "week" | "month";

const NavigationButtons = ({ type }: { type: NavigationType }) => {
  const selectedDate = useSelector((state: RootState) => state.selectedDate);
  const dispatch = useDispatch();

  const handleClick = (type: string, direction: string) => {
    const offset: number = direction === "right" ? 7 : -7;
    const parsedDate = parseSelectedDateToDate(selectedDate);
    parsedDate.setDate(parsedDate.getDate() + offset);
    dispatch(setSelectedDate(parseDateToSelectedDate(parsedDate)));
  };

  return (
    <div className="buttons">
      <div
        className="btn-navigation"
        onClick={() => {
          handleClick(type, "left");
        }}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </div>
      <div
        className="btn-navigation"
        onClick={() => {
          handleClick(type, "right");
        }}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </div>
    </div>
  );
};

export default NavigationButtons;
