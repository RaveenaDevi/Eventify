import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginUsersAsync } from "../Redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

import image1 from "../assets/3071357.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formData = { email, password };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      const resultAction = await dispatch(loginUsersAsync(formData));

      if (loginUsersAsync.fulfilled.match(resultAction)) {
        navigate("/dashboard"); // Navigate to dashboard on successful login
      } else {
        setError("Login failed. User not found.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container fluid className="auth-container">
      <Row className="m-auto align-items-center w-75">
        <Col md={6} className="d-none d-md-block p-0">
          <img src={image1} alt="Login" className="auth-img" />
        </Col>
        <Col md={6}>
          <div className="auth-card">
            <h2>Login</h2>
            <Form onSubmit={handleSubmitLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3">
                Login
              </Button>
            </Form>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            <div className="mt-3">
              Don't have an account? <Link to="/register">Register here</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
