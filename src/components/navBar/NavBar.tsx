import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import NavigationButtons from "../common/button/NavigationButtons";
import DateIndicator from "./dateIndicator/DateIndicator";
import "./NavBar.styles.scss";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom fixed-top">
      <div className="container-fluid">
        <div className="collapse navbar-collapse flex-grow-0" id="navbarBrand">
          <img
            className="gb_yc gb_5d"
            src="//ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_29_2x.png#"
            srcSet="//ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_29_2x.png 2x ,//ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_29_2x.png# 1x"
            alt=""
            aria-hidden="true"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="navbar-brand text-muted">캘린더</div>
        </div>
        <ul className="nav me-auto flex-row overflow-hidden">
          <li className="nav-item">
            <button className="btn border">오늘</button>
          </li>
          <li className="nav-item">
            <NavigationButtons type="week" />
          </li>
          <li className="nav-item">
            <DateIndicator />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
