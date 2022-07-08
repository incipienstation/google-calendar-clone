import "./DatePicker.styles.scss";
import { DateFormatter, DayPicker } from "react-day-picker";
import ko from "date-fns/esm/locale/ko";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  parseSelectedDateToDate,
  parseDateToSelectedDate,
  setSelectedDate,
} from "../../features/selectedDate/selectedDateSlice";
import { RootState } from "../../features/store";
import { useEffect, useState } from "react";

const formatCaption: DateFormatter = (date) => {
  return <>{format(date, "Y년 M월")}</>;
};

const DatePicker = () => {
  const selectedDate = useSelector((state: RootState) => state.selectedDate);
  const dispatch = useDispatch();
  const [month, setMonth] = useState<Date>(
    parseSelectedDateToDate(selectedDate)
  );

  useEffect(() => {
    setMonth(parseSelectedDateToDate(selectedDate));
    return () => {};
  }, [selectedDate]);

  return (
    <div id="date-picker">
      <DayPicker
        mode="single"
        locale={ko}
        showOutsideDays
        fixedWeeks
        formatters={{ formatCaption }}
        required
        // disableNavigation
        selected={parseSelectedDateToDate(selectedDate)}
        onSelect={(date: Date | undefined) => {
          dispatch(setSelectedDate(parseDateToSelectedDate(date!)));
        }}
        month={month}
        onMonthChange={setMonth}
      />
    </div>
  );
};

export default DatePicker;
