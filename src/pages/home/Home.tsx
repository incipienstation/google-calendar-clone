import { useParams } from "react-router-dom";
import MonthCalendarView from "../../components/calendarView/MonthCalendarView";
import WeekCalendarView from "../../components/calendarView/WeekCalendarView";
import DatePicker from "../../components/datePicker/DatePicker";
import Modal from "../../components/modal/Modal";
import NavBar from "../../components/navBar/NavBar";
import "./Home.styles.scss";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const { view, year, month, day } = useParams();  

  const fetchCatFacts = () => {
    axios
      .request({
        method: "GET",
        url: "https://catfact.ninja/fact",
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchBored = () => {
    axios
      .request({
        method: "GET",
        url: "https://www.boredapi.com/api/activity",
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchCatFacts();

    return () => {
      fetchBored();
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="container-fluid page-body">
        <DatePicker />
        {view === "week" ? <WeekCalendarView /> : <MonthCalendarView />}
      </div>
      <Modal />
    </>
  );
};

export default Home;
