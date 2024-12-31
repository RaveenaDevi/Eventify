import React from "react";
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import image1 from "../assets/event-image-1.jpg";
import image2 from "../assets/event-image-2.jpg";
import image3 from "../assets/event-image-3.jpg";

const Homepage = () => {
  return (
    <div className="Homepage">
      <section className="banner-section p-5">
        <Container>
          <Row>
            <Col className="py-5">
              <h1>Welcome to Eventify</h1>
              <p className="lead">
                Your ultimate platform to discover, create, and manage events
                effortlessly.
              </p>
              <Button variant="light" size="lg" as={Link} to="/events">
                View All Events
              </Button>
            </Col>
            <Col>
              <video
                id="banner-intro"
                autoPlay
                muted
                loop
                playsInline
                width="100%"
                poster="//www.zohowebstatic.com/sites/zweb/images/backstage/home/banner-intro.webp"
              >
                <source
                  src="//www.zohowebstatic.com/sites/zweb/images/backstage/home/banner-intro.mov"
                  type="video/quicktime"
                />
                <source
                  src="//www.zohowebstatic.com/sites/zweb/images/backstage/home/banner-intro.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-section py-5">
        <Container>
          <Row>
            <Col md={6}>
              <Image
                src="https://img.freepik.com/premium-photo/rear-side-audiences-sitting-listening-speackers-stage_41418-1304.jpg?w=740"
                alt="About Image"
                fluid
                className="mb-4 mb-md-0"
              />
            </Col>
            <Col md={6} className="d-flex align-items-center">
              <div>
                <h2>About Eventify</h2>
                <p>
                  Eventify is your go-to platform for discovering, creating, and
                  managing events of all kinds. Whether you're looking to attend
                  the hottest events in town or organize your own, Eventify
                  provides all the tools you need to make it happen seamlessly.
                </p>
                <p>
                  Join our community and explore a wide range of events from
                  concerts and conferences to workshops and festivals. With
                  Eventify, the possibilities are endless.
                </p>
                <p>
                  Start creating and managing your events today with our
                  user-friendly interface and comprehensive features designed to
                  enhance your event experience.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="events-grid-section py-5">
        <Container>
          <h2 className="text-center mb-4">Upcoming Events</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card
                as={Link}
                to={"/events"}
                className="event-card shadow-lg h-100"
              >
                <Card.Img variant="top" src={image1} />
                <Card.Body>
                  <Card.Title>Event 1</Card.Title>
                  <Card.Text>
                    Discover the excitement of Event 1. Join us for an
                    unforgettable experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card
                as={Link}
                to={"/events"}
                className="event-card shadow-lg h-100"
              >
                <Card.Img variant="top" src={image2} />
                <Card.Body>
                  <Card.Title>Event 2</Card.Title>
                  <Card.Text>
                    Don't miss out on Event 2. It's going to be an event to
                    remember.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card
                as={Link}
                to={"/events"}
                className="event-card shadow-lg h-100"
              >
                <Card.Img variant="top" src={image3} />
                <Card.Body>
                  <Card.Title>Event 3</Card.Title>
                  <Card.Text>
                    Join us for Event 3 and be part of something extraordinary.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section text-center py-5">
        <Container>
          <h2 className="mb-4">Join Us Today!</h2>
          <p className="lead mb-4">
            Sign up now to explore and create amazing events.
          </p>
          <Button as={Link} to="/login" variant="light" size="lg">
            Get Started
          </Button>
        </Container>
      </section>

      <section className="sponsors-section py-5">
        <Container>
          <h2 className="text-center mb-4">Our Sponsors</h2>
          <Row className="justify-content-center g-4">
            <Col className="text-center mb-4">
              <Image
                src="https://www.logodesignteam.com/blog/wp-content/uploads/2018/06/event-management-logo-portfolio.jpg"
                alt="Sponsor 1"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
};

export default Homepage;
