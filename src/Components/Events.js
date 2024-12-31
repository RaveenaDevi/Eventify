import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAsync } from "../Redux/EventSlice";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Events = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.Events);

  useEffect(() => {
    const getAllEvents = async () => {
      await dispatch(getEventsAsync());
    };
    getAllEvents();
  }, [dispatch]);

  return (
    <div className="events-page">
      <div className="banner">
        <h2>Explore All Events</h2>
        <p>Discover What's Happening Near You</p>
      </div>
      <Container>
        <Row className="3 my-4">
          {events?.map((event, index) => (
            <Link
              key={index}
              to={`/event/` + event._id}
              className="col-md-4 mt-4 text-decoration-none"
            >
              <EventCard event={event} />
            </Link>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Events;
