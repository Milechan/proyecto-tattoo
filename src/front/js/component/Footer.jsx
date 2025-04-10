import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#6c282f", color: "#f5f4f2", padding: "1.5rem 0" }}>
            <Container>
                <Row>
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <div>
                            <a href="https://facebook.com" className="text-light me-3">
                                <i className="fab fa-facebook fa-3x"></i>
                            </a>
                            <a href="https://instagram.com" className="text-light me-3">
                                <i className="fab fa-instagram fa-3x"></i>
                            </a>
                        </div>
                    </Col>

                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <a href="/about" className="d-block text-light text-decoration-none">Quiénes somos</a>
                        <a href="/terms" className="d-block text-light text-decoration-none">Términos y condiciones</a>
                    </Col>

                    <Col md={4} className="text-center">
                        <h5>MatchTattoo © 2025</h5>
                        <p className="mb-0">Todos los derechos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
