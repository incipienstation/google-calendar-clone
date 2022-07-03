import "./CalendarView.styles.scss";
import TimeBar from "./timeBar/TimeBar";
import TimeTable from "./timeTable/TimeTable";
import WeekBar from "./weekBar/WeekBar";

const WeekCalendarView = () => {
  return (
    <div className="week-view">
      <div className="row-fixed">
        <div id="gmt">GMT+09</div>
        <WeekBar />
      </div>
      <div className="row-fixed">
        <TimeBar />
        <TimeTable />
      </div>
    </div>
  );
};

export default WeekCalendarView;
