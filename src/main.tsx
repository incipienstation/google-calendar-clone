import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss"
import { store } from "./features/store";
import { Provider } from "react-redux";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const today = new Date();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={`calendar/week/${today.getFullYear()}/${
                  today.getMonth() + 1
                }/${today.getDate()}`}
              ></Navigate>
            }
          ></Route>
          <Route
            path="/calendar/:view/:year/:month/:day"
            element={<Home />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
