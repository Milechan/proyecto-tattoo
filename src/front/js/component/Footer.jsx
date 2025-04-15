import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const linkStyle = {
    fontSize: "1.5rem",
    color: "#f5f4f2",
    textDecoration: "none",
    transition: "all 0.3s ease"
};

const linkHoverStyle = {
    textDecoration: "underline",
    color: "#ccd5dc"
};

const Footer = () => {
    // Estado para manejar el hover (opcional si quieres hacerlo más dinámico por elemento)
    return (
        <footer
            style={{
                backgroundColor: "#6c282f",
                color: "#f5f4f2",
                padding: "1rem 0",
                fontSize: "1.5rem",
                lineHeight: "2rem"
            }}
        >
            <Container>
                <Row>
                    {/* Redes sociales */}
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <a href="https://facebook.com" className="text-light me-3">
                            <i className="fab fa-facebook fa-3x"></i>
                        </a>
                        <a href="https://instagram.com" className="text-light me-3">
                            <i className="fab fa-instagram fa-3x"></i>
                        </a>
                    </Col>

                    {/* Links */}
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <a
                            href="/about"
                            style={linkStyle}
                            onMouseOver={e => Object.assign(e.target.style, linkHoverStyle)}
                            onMouseOut={e => Object.assign(e.target.style, linkStyle)}
                            className="d-block"
                        >
                            Quiénes somos
                        </a>
                        <a
                            href="/terms-and-conditions"
                            style={linkStyle}
                            onMouseOver={e => Object.assign(e.target.style, linkHoverStyle)}
                            onMouseOut={e => Object.assign(e.target.style, linkStyle)}
                            className="d-block"
                        >
                            Términos y condiciones
                        </a>
                    </Col>

                    {/* Derechos */}
                    <Col md={4} className="text-center">
                        <p className="mb-0" style={{ fontWeight: "600", fontSize: "1.5rem" }}>
                            MatchTattoo © 2025
                        </p>
                        <p className="mb-0" style={{ fontSize: "1.5rem" }}>
                            Todos los derechos reservados.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
