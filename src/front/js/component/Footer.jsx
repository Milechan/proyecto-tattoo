import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/footer.css"

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: "#6c282f",
                color: "#f5f4f2",
                padding: "1 rem 0",
                fontSize: "1rem",
                lineHeight: "1.5rem"
            }}
        >
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
                        <a
                            href="/about"
                            className="d-block text-light text-decoration-none"
                            style={{ fontSize: "1.5rem" }}
                        >
                            Quiénes somos
                        </a>
                        <a
                            href="/terms-and-conditions"
                            className="d-block text-light text-decoration-none"
                            style={{ fontSize: "1.5rem" }}
                        >
                            Términos y condiciones
                        </a>
                    </Col>

                    <Col md={4} className="text-center">
                        <p className="mb-0" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                            MatchTattoo © 2025
                        </p>
                        <p className="mb-0" style={{ fontSize: "1.5rem" }}>
                            Todos los derechos reservados.
                        </p>
                        <a href="/about" className="d-block text-light text-decoration-none footer-text">Quiénes somos</a>
                        <a href="/terms-and-conditions" className="d-block text-light text-decoration-none footer-text">Términos y condiciones</a>
                    </Col>

                    <Col md={4} className="text-center footer-text">
                        <h5 className="footer-text">MatchTattoo © 2025</h5>
                        <p className="mb-0 footer-text">Todos los derechos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
