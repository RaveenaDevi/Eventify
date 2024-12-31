import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventByIdAsync } from "../Redux/EventSlice";
import { joinEventAsync, myJoinEventAsync } from "../Redux/JoinEventSlice";
import image1 from "../assets/event-image-1.jpg";
import Footer from "./Footer";

const SingleEvent = () => {
  const [tickets, setTickets] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  const [joinedEvent, setJoinedEvent] = useState([]);

  const dispatch = useDispatch();
  const { eventId } = useParams();
  const { token } = useSelector((state) => state.Auth); 
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    image: null,
    video: null,
  });

  useEffect(() => {
    const getEvent = async (eventId) => {
      const eventResponse = await dispatch(getEventByIdAsync(eventId));
      setEvent(eventResponse.payload);
      const { payload } = await dispatch(myJoinEventAsync());
      const joinedEventId = payload?.map((event) => event?._id);
      setJoinedEvent(joinedEventId);
    };
    getEvent(eventId);
  }, [dispatch, eventId]);

  useEffect(() => {
    if (event && joinedEvent) {
      setTickets(event?.capacity - event?.attendees?.length ?? 0);
      const joinIndex = joinedEvent.indexOf(eventId);
      setIsJoined(joinIndex >= 0);
    }
  }, [event, joinedEvent, eventId]);

  const handleJoinEvent = async (eventId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    await dispatch(joinEventAsync(eventId));
    setIsJoined(true);
  };

  return (
    <div>
      <div className="text-center bg-primary text-white py-5 mb-4 inner-banner">
        <h2>Event Details</h2>
        <p>Get all the information about this exciting event right here!</p>
      </div>

      <Card className="shadow-lg m-5">
        <Row>
          <Col md={6}>
            <Image
              src={image1}
              style={{ height: "100%", objectFit: "cover" }}
              className="rounded-start w-100"
            />
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center p-4">
            <h2 className="text-dark">{event.title}</h2>
            <p>
              <strong>Organizer:</strong>
            </p>
            <p className="ps-3">
              <strong>Name:</strong> {event?.organizer?.name}
            </p>
            <p className="ps-3">
              <strong>Email:</strong> {event?.organizer?.email}
            </p>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Event Date:</strong>{" "}
              {new Date(event?.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Event Time:</strong> {event?.time}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            {new Date() <= new Date(event?.date) ? (
              <>
                <p>
                  <strong>Tickets Left:</strong> {tickets}
                </p>
                <p className="text-success">Event is coming soon!</p>
                {!isJoined ? (
                  <Button
                    onClick={() => handleJoinEvent(eventId)}
                    className="mt-2"
                  >
                    Join Now
                  </Button>
                ) : (
                  <Button variant="secondary" className="mt-2" disabled>
                    Already Joined
                  </Button>
                )}
              </>
            ) : (
              <p className="text-danger">The event is completed.</p>
            )}
          </Col>
        </Row>
      </Card>
      <Footer />
    </div>
  );
};

export default SingleEvent;
