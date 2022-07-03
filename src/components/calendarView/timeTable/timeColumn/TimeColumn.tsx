import { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Event } from "../../../../features/eventData/eventDataSlice";
import {
  compareSelectedDate,
  SelectedDate,
  selectedDateEquals,
} from "../../../../features/selectedDate/selectedDateSlice";
import { RootState } from "../../../../features/store";
import EventBox from "./eventBox/EventBox";
import TimeCell from "./timeCell/TimeCell";

const TimeColumn = ({ day }: { day: number }) => {
  const selectedDate = useSelector((state: RootState) => state.selectedDate);
  const currWeek = selectedDate.currWeek!;
  const { eventData } = useSelector((state: RootState) => state.eventData);
  const selectedEvent = useSelector((state: RootState) => state.selectedEvent);
  const dispatch = useDispatch();

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

  const currDate: SelectedDate = currWeek
    .filter((date) => date.day === day)
    .at(0)!;

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

  const eventBoxBuilder = eventData
    .filter(
      (event) =>
        compareSelectedDate(event.dateTimeRange[0].date, currDate) <= 0 &&
        compareSelectedDate(event.dateTimeRange[1].date, currDate) >= 0
    )
    .map((event) => (
      <EventBox
        key={event.id + currDate.day}
        event={event}
        range={getRange(event)}
      />
    ));

  const newEventBoxBuilder: ReactNode =
    selectedEvent.event !== undefined &&
    (selectedEvent.event.isNew ?? false) &&
    (selectedDateEquals(selectedEvent.event.dateTimeRange[0].date, currDate) ||
      selectedDateEquals(
        selectedEvent.event.dateTimeRange[1].date,
        currDate
      )) ? (
      <EventBox
        key={selectedEvent.event.id}
        event={selectedEvent.event}
        range={getRange(selectedEvent.event)}
      />
    ) : null;

  return (
    <div className="time-column col g-0">
      {columnBuilder}
      <div>
        {eventBoxBuilder}
        {newEventBoxBuilder}
      </div>
    </div>
  );
};

export default TimeColumn;
