import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRouteWithModal from "./Components/PrivateRoute";
import EventMenu from "./Components/EventMenu";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import RegisterUser from "./Components/RegisterUser";
import Dashboard from "./Components/Dashboard";
import Events from "./Components/Events";
import SingleEvent from "./Components/SingleEvent";
import AddEvent from "./Components/AddEvent";

function App() {
  return (
    <div className="App">
      <Router>
        <EventMenu />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:eventId" element={<SingleEvent />} />
          <Route
            path="/event/edit/:eventId"
            element={
              <PrivateRouteWithModal>
                <AddEvent />
              </PrivateRouteWithModal>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRouteWithModal>
                <Dashboard />
              </PrivateRouteWithModal>
            }
          />
          <Route
            path="/event/add"
            element={
              <PrivateRouteWithModal>
                <AddEvent />
              </PrivateRouteWithModal>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
