import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { myJoinEventAsync } from "../Redux/JoinEventSlice";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { getEventsAsync } from "../Redux/EventSlice";
import Footer from "./Footer";

const Dashboard = () => {
  const { token } = useSelector((state) => state.Auth);
  const [myRegisterEvents, setMyRegisterEvents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsAsync());
    const getMyRegisterEvents = async () => {
      const response = await dispatch(myJoinEventAsync());
      setMyRegisterEvents(response.payload);
    };
    getMyRegisterEvents();
  }, [token, dispatch]);

  const { events } = useSelector((state) => state.Events);
  const { userEmail } = useSelector((state) => state.Auth);

  // Upcoming events
  const upComimgEvents = myRegisterEvents?.filter((event) => {
    const currentDate = new Date();
    const eventDate = new Date(event.date);
    return eventDate > currentDate;
  });

  // Previous events
  const previousEvents = myRegisterEvents?.filter((event) => {
    const currentDate = new Date();
    const eventDate = new Date(event.date);
    return eventDate <= currentDate;
  });

  // My added events
  const myAddedEvent = events?.filter((event) => {
    return userEmail === event?.organizer?.email;
  });

  return (
    <>
      <div className="dashboard-banner">
        <h2>Your Event Dashboard</h2>
        <p>Discover What's Happening Near You</p>
      </div>
      <Container className="my-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column side-nav">
                <Nav.Item>
                  <Nav.Link eventKey="first">Upcoming Joined Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">My Added Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Previous Joined Events</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="p-3 border rounded">
                <Tab.Pane eventKey="first">
                  <Row>
                    {upComimgEvents?.length > 0
                      ? upComimgEvents.map((event, index) => (
                          <Link
                            key={index}
                            to={`/event/${event._id}`}
                            className="col-md-4 mt-4 text-decoration-none"
                          >
                            <EventCard event={event} />
                          </Link>
                        ))
                      : "No events available"}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Row>
                    {myAddedEvent?.length > 0
                      ? myAddedEvent.map((event, index) => (
                          <Link
                            key={index}
                            to={`/event/${event._id}`}
                            className="col-md-4 mt-4 text-decoration-none"
                          >
                            <EventCard event={event} isEdit={true} />
                          </Link>
                        ))
                      : "No events available"}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Row>
                    {previousEvents?.length > 0
                      ? previousEvents.map((event, index) => (
                          <Link
                            key={index}
                            to={`/event/${event._id}`}
                            className="col-md-4 mt-4 text-decoration-none"
                          >
                            <EventCard event={event} />
                          </Link>
                        ))
                      : "No events available"}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
