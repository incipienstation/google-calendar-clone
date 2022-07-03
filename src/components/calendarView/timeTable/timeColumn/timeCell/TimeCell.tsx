import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  parseDateToSelectedDate,
  parseSelectedDateToDate,
  SelectedDate,
} from "../../../../../features/selectedDate/selectedDateSlice";
import { setSelectedEvent } from "../../../../../features/selectedEvent/selectedEventSlice";
import { RootState } from "../../../../../features/store";
import { Event } from "../../../../../features/eventData/eventDataSlice";
import { openModal } from "../../../../../features/modalControl/modalControlSlice";

const TimeCell = ({
  day,
  timeIndex,
  className,
}: {
  day: number;
  timeIndex: number;
  className: string;
}) => {
  const selectedDate = useSelector((state: RootState) => state.selectedDate);
  const currDate: SelectedDate = selectedDate.currWeek?.at(day)!;
  const dispatch = useDispatch();

  const handleClick = () => {
    const startDate: Date = parseSelectedDateToDate(currDate);
    startDate.setHours(Math.floor(timeIndex / 2));
    startDate.setMinutes((timeIndex % 2) * 30);
    const startSelectedDate: SelectedDate = parseDateToSelectedDate(startDate);
    const endDate: Date = new Date(startDate.getTime());
    endDate.setHours(endDate.getHours() + 1);
    const endSelectedDate: SelectedDate = parseDateToSelectedDate(endDate);

    const newEvent: Event = {
      id: "newEvent",
      title: "(제목 없음)",
      dateTimeRange: [
        {
          date: startSelectedDate,
          hour: startDate.getHours(),
          minute: startDate.getMinutes(),
        },
        {
          date: endSelectedDate,
          hour: endDate.getHours(),
          minute: endDate.getMinutes(),
        },
      ],
      isNew: true,
    };

    dispatch(setSelectedEvent({ event: newEvent }));
    dispatch(openModal({ modalType: "event-create", event: newEvent }));
  };

  return (
    <>
      <div className={className} onClick={handleClick}></div>
    </>
  );
};

export default TimeCell;
