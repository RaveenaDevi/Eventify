import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import image1 from "../assets/event-image-1.jpg";
import image2 from "../assets/event-image-2.jpg";
import image3 from "../assets/event-image-3.jpg";
import image4 from "../assets/event-image-4.jpg";
import { Link } from "react-router-dom";

const EventCard = ({ event, isEdit }) => {
  const baseURL = `http://ec2-3-109-54-45.ap-south-1.compute.amazonaws.com/`;
  const images = [image1, image2, image3, image4];
  const randomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  const { title, description, date, location, image, time } = event;
  const imageUrl = randomImage();

  return (
    <div>
      <Card className="event-card shadow-lg h-100">
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="truncate-3-lines">{description}</Card.Text>
          <p className="d-flex flex-row-reverse">
            <i>
              {" "}
              On Date: {date.slice(0, 10)} {time}
            </i>
          </p>
          {isEdit ? (
            <Button as={Link} to={`/event/edit/${event._id}`} variant="primary">
              Edit Event
            </Button>
          ) : (
            <Button variant="primary">Join Now</Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventCard;
