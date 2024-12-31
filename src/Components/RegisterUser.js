import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { regUsersAsync } from "../Redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

import image1 from "../assets/3071357.jpg";
const RegisterUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "attendee",
  });

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    if (!validateEmail(formData.email)) {
      setMessage("Invalid email format");
      setVariant("danger");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setVariant("danger");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setVariant("danger");
      return;
    }

    try {
      const resultAction = await dispatch(regUsersAsync(formData));

      if (regUsersAsync.fulfilled.match(resultAction)) {
        localStorage.setItem("loginEmail", formData.email);
        setMessage("Registration successful!");
        setVariant("success");
        navigate("/dashboard"); // Navigate to dashboard after successful registration
      } else {
        setMessage("Registration failed. Please try again.");
        setVariant("danger");
      }
    } catch (err) {
      setMessage("An error occurred during registration.");
      setVariant("danger");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <Container fluid className="auth-container">
      <Row className="m-auto align-items-center w-75">
        <Col md={6} className="d-none d-md-block p-0">
          <img src={image1} alt="Register" className="auth-img" />
        </Col>
        <Col md={6}>
          <div className="auth-card">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Register
              </Button>
            </Form>
            {message && (
              <Alert className="mt-4" variant={variant}>
                {message}
              </Alert>
            )}
            <div className="mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterUser;
