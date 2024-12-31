import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutUsersAsync } from "../Redux/AuthSlice";

const EventMenu = () => {
  const { token } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutUser = async () => {
    await dispatch(logOutUsersAsync());
    navigate("/");
  };

  const handleAddEventClick = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <Navbar
      bg="light"
      data-bs-theme="light"
      sticky="top"
      className="nav-menu py-3 justify-content-center"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Eventify
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/dashboard" onClick={handleAddEventClick}>
            Your Events
          </Nav.Link>
          <Nav.Link as={Link} to="/events">
            All Events
          </Nav.Link>
          <Nav.Link as={Link} to="/event/add" onClick={handleAddEventClick}>
            Add Event
          </Nav.Link>
        </Nav>
        <Nav>
          {!token ? (
            <>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          ) : (
            <Button variant="danger" className="me-4" onClick={logOutUser}>
              Log Out
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default EventMenu;
