import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer-section py-3">
      <Container>
        <Row>
          <Col>
            <p className="text-center">
              &copy; 2024 Your Events. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
