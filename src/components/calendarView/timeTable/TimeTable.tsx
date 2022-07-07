import { UIEvent } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setScrollPoint } from "../../../features/scrollPoint/scrollPointSlice";
import {
  compareSelectedDate,
  getYesterday,
  SelectedDate,
} from "../../../features/selectedDate/selectedDateSlice";
import {
  addTimeInterval,
  getTimeInterval,
} from "../../../features/selectedEvent/selectedEventSlice";
import { Event } from "../../../features/eventData/eventDataSlice";
import { RootState } from "../../../features/store";
import TimeColumn from "./timeColumn/TimeColumn";

const TimeTable = () => {
  const { eventData } = useSelector((state: RootState) => state.eventData);
  const selectedDate = useSelector((state: RootState) => state.selectedDate);
  const currWeek = selectedDate.currWeek!;
  const dispatch = useDispatch();

  const standardEventList = eventData.filter(
    (event) =>
      compareSelectedDate(currWeek.at(0)!, event.dateTimeRange[1].date) <= 0 &&
      compareSelectedDate(currWeek.at(6)!, event.dateTimeRange[0].date) >= 0
  );

  const repeatedEventList: Event[] = [];
  currWeek.concat(getYesterday(currWeek.at(0)!)).forEach((currDate) => {
    repeatedEventList.push(
      ...eventData
        .filter(
          (event) =>
            event.repeat !== undefined &&
            compareSelectedDate(event.dateTimeRange[0].date, currDate) < 0
        )
        .filter((event) => {
          const eventDate: SelectedDate = event.dateTimeRange[0].date;
          switch (event.repeat) {
            case "every-day":
              return true;
            case "every-week":
              return currDate.day === eventDate.day;
            case "every-month":
              return currDate.date === eventDate.date;
            case "every-year":
              return (
                currDate.month === eventDate.month &&
                currDate.date === eventDate.date
              );
          }
        })
        .map((event) => {
          const resEvent: Event = JSON.parse(JSON.stringify(event));
          const timeInterval = getTimeInterval(
            event.dateTimeRange[0],
            event.dateTimeRange[1]
          );
          resEvent.dateTimeRange[0].date = { ...currDate };
          resEvent.dateTimeRange[1] = addTimeInterval(
            resEvent.dateTimeRange[0],
            timeInterval
          );
          return resEvent;
        })
    );
  });

  const eventList = [...standardEventList, ...repeatedEventList];

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    dispatch(
      setScrollPoint({
        scrollX: e.currentTarget.scrollLeft,
        scrollY: e.currentTarget.scrollTop,
      })
    );
  };

  const timeCellBuilder = Array(8)
    .fill(0)
    .map((v, i) => {
      const danglingBuilder = Array(48)
        .fill(0)
        .map((v, j) => {
          return (
            <div
              key={i.toString() + " " + j.toString()}
              className={
                j % 2 === 0 && j !== 0
                  ? "danglings danglings-bordered"
                  : "danglings"
              }
            />
          );
        });
      return i === 0 ? (
        <div key={i.toString()} className="g-0">
          {danglingBuilder}
        </div>
      ) : (
        <TimeColumn key={i.toString()} eventList={eventList} day={i - 1} />
      );
    });

  return (
    <div>
      <div className="text-center time-table g-0" onScroll={handleScroll}>
        {timeCellBuilder}
      </div>
    </div>
  );
};

export default TimeTable;
