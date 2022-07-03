import { useSelector } from "react-redux";
import { dayList } from "../../../features/eventData/eventDataSlice";
import { SelectedDate } from "../../../features/selectedDate/selectedDateSlice";
import { RootState } from "../../../features/store";

const WeekBar = () => {
  const scrollPoint = useSelector((state: RootState) => state.scrollPoint);
  const selectedDate = useSelector((state: RootState) => state.selectedDate);
  const dateList: number[] = selectedDate.currWeek!.map((v) => v.date);
  const compareWithToday = (selectedDate: SelectedDate): number => {
    const today: Date = new Date();
    const tempDate: Date = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.date
    );

    if (
      selectedDate.year === today.getFullYear() &&
      selectedDate.month === today.getMonth() + 1 &&
      selectedDate.date === today.getDate()
    ) {
      return 0;
    } else if (today > tempDate) {
      return -1;
    } else {
      return 1;
    }
  };
  const weekBarBuilder = selectedDate.currWeek!.map(
    (date: SelectedDate, i: number) => {
      const res: number = compareWithToday(date);
      const [nameProps, dateProps]: string[] = [
        res === 0 ? "day-display-name today" : "day-display-name",
        res === 0
          ? "day-display-date today"
          : res === -1
          ? "day-display-date before"
          : "day-display-date after",
      ];
      return (
        <div key={i.toString()} className="col day-display">
          <div key={i.toString() + nameProps} className={nameProps}>
            {dayList[i]}
          </div>
          <div key={i.toString() + dateProps} className={dateProps}>
            {dateList[i]}
          </div>
          <div key={i.toString()} className="border-fragment" />
        </div>
      );
    }
  );
  return (
    <div
      className="row text-center align-items-center week-bar g-0"
      style={{
        transform: `translateX(-${scrollPoint.scrollX}px)`,
      }}
    >
      {weekBarBuilder}
    </div>
  );
};

export default WeekBar;
