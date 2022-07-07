import { useSelector, useDispatch } from "react-redux";
import { Event } from "../../../../features/eventData/eventDataSlice";
import {
  compareSelectedDate,
  SelectedDate,
} from "../../../../features/selectedDate/selectedDateSlice";
import {
  addTimeInterval,
  getTimeInterval,
} from "../../../../features/selectedEvent/selectedEventSlice";
import { RootState } from "../../../../features/store";
import EventBox from "./eventBox/EventBox";
import TimeCell from "./timeCell/TimeCell";

const TimeColumn = ({
  day,
  eventList,
}: {
  day: number;
  eventList: Event[];
}) => {
  const selectedDate = useSelector((state: RootState) => state.selectedDate);
  const currDate: SelectedDate = selectedDate
    .currWeek!.filter((date) => date.day === day)
    .at(0)!;
  const { event: selectedEvent } = useSelector(
    (state: RootState) => state.selectedEvent
  );

  const columnBuilder = Array(48)
    .fill(0)
    .map((v, i) => {
      const className: string =
        i % 2 === 0 && i !== 0 ? "time-cell time-cell-bordered" : "time-cell";

      return (
        <TimeCell
          key={i.toString()}
          day={day}
          timeIndex={i}
          className={className}
        />
      );
    });

  const getRange = (event: Event) => {
    const start: number =
      compareSelectedDate(event.dateTimeRange[0].date, currDate) < 0
        ? 0
        : event.dateTimeRange[0].hour * 48 +
          event.dateTimeRange[0].minute * (48 / 60);
    const end: number =
      compareSelectedDate(event.dateTimeRange[1].date, currDate) > 0
        ? 48 * 24
        : event.dateTimeRange[1].hour * 48 +
          event.dateTimeRange[1].minute * (48 / 60);
    return { start: start, end: end };
  };

  const newEvent: Event | null =
    selectedEvent !== null &&
    (selectedEvent.isNew ?? false) &&
    compareSelectedDate(selectedEvent.dateTimeRange[0].date, currDate) <= 0 &&
    compareSelectedDate(selectedEvent.dateTimeRange[1].date, currDate) >= 0
      ? selectedEvent
      : null;

  const eventBoxBuilder = (
    newEvent !== null ? [...eventList, newEvent] : eventList
  )
    .filter(
      (event) =>
        compareSelectedDate(event.dateTimeRange[0].date, currDate) <= 0 &&
        compareSelectedDate(event.dateTimeRange[1].date, currDate) >= 0
    )
    .map((event) => (
      <EventBox
        key={event.id + event.dateTimeRange[0].date.date}
        event={event}
        range={getRange(event)}
      />
    ));

  return (
    <div className="time-column col g-0">
      {columnBuilder}
      {eventBoxBuilder}
    </div>
  );
};

export default TimeColumn;
