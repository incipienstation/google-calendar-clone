import { useParams } from "react-router-dom";
import MonthCalendarView from "../../components/calendarView/MonthCalendarView";
import WeekCalendarView from "../../components/calendarView/WeekCalendarView";
import DatePicker from "../../components/datePicker/DatePicker";
import Modal from "../../components/modal/Modal";
import NavBar from "../../components/navBar/NavBar";
import "./Home.styles.scss";

const Home = () => {
  const { view, year, month, day } = useParams();
  return (
    <>
      <NavBar />
      <div className="container-fluid page-body">
        <DatePicker />
        {view === "week" ? <WeekCalendarView /> : <MonthCalendarView />}
      </div>
      <Modal/>
    </>
  );
};

export default Home;
