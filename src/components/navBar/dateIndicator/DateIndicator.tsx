import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";

const DateIndicator = () => {
  const selectedDate = useSelector((state: RootState) => state.selectedDate);
  const [sundayMonth, saturdayMonth] = [
    selectedDate.currWeek?.at(0)?.month,
    selectedDate.currWeek?.at(6)?.month,
  ];
  const monthString: string =
    sundayMonth === saturdayMonth
      ? `${sundayMonth}월`
      : `${sundayMonth}월 - ${saturdayMonth}월`;

  return (
    <>
      <div className="date-indicator">
        {`${selectedDate.year}년 ${monthString}`}
      </div>
    </>
  );
};

export default DateIndicator;
