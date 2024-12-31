import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import {
  addEventsAsync,
  editEventAsync,
  getEventByIdAsync,
} from "../Redux/EventSlice";
import Footer from "./Footer";

const AddEvent = () => {
  const [editId, setEditId] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  const handleChangeFiles = (e) => {
    const { name, files } = e.target;
    setEvent((prevState) => ({ ...prevState, [name]: files[0] }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(event).forEach((key) => {
      formData.append(key, event[key]);
    });
    if (eventId) {
      await dispatch(editEventAsync({ eventId, formData }));
    } else {
      await dispatch(addEventsAsync(formData));
    }
    navigate("/Dashboard");
  };

  useEffect(() => {
    if (eventId) {
      const getEditEvent = async (eventId) => {
        const editEvent = await dispatch(getEventByIdAsync(eventId));
        setEvent(editEvent.payload);
        setEditId(eventId);
      };
      getEditEvent(eventId);
    }
  }, [eventId, dispatch]);

  useEffect(() => {
    if (eventId) {
      const dateObj = new Date(event.date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setEvent((prevState) => ({ ...prevState, date: formattedDate }));
    }
  }, [editId, event.date]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedCurrentDate = `${year}-${month}-${day}`;

  return (
    <div>
      <section className="banner">
        <Container>
          <Row>
            <Col className=" text-center">
              <h2>{eventId ? "Edit Event" : "Add New Event"}</h2>
              <p>Manage your events effortlessly with Eventify.</p>
            </Col>
          </Row>
        </Container>
      </section>
      <Container className="my-4">
        <Form onSubmit={handleOnSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={event.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={event.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  name="date"
                  value={event.date}
                  onChange={handleChange}
                  required
                  min={formattedCurrentDate}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Time"
                  name="time"
                  value={event.time}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={event.location}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.capacity">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Capacity"
                  name="capacity"
                  value={event.capacity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChangeFiles}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="exampleForm.video">
                <Form.Label>Video</Form.Label>
                <Form.Control
                  type="file"
                  accept="video/*"
                  name="video"
                  onChange={handleChangeFiles}
                />
              </Form.Group>
            </Col>

            <Col md={12} className="text-center">
              <Button type="submit" className="mt-3">
                {editId ? "Edit" : "Add"} Event
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default AddEvent;
