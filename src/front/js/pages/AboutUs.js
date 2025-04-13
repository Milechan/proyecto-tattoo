import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AboutUs.css";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Milena",
      role: "Fullstack Developer",
      img: "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/equipo/Milena.webp"
    },
    {
      name: "Alan",
      role: "Fullstack Developer",
      img: "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/equipo/Alan.webp"
    },
    {
      name: "Samuel",
      role: "Fullstack Developer",
      img: "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/equipo/Samuel.webp"
    },
    {
      name: "Damian",
      role: "Fullstack Developer",
      img: "https://via.placeholder.com/150"
    },
    {
      name: "Ángela",
      role: "Fullstack Developer",
      img: "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/equipo/Angela.webp"
    }
  ];

  return (
    <Container className="about-section mt-5">
      <h1 className="text-center about-title">Sobre Nosotros</h1>
      <Row>
        <Col md={6}>
          <h4 className="about-subtitle">Quiénes somos</h4>
          <p className="about-text">
            Somos una plataforma que busca diversificar la oferta y la demanda de tatuadores, haciendo su trabajo más fácil a la hora de conseguir clientes y brindándoles a los clientes la posibilidad de conectar con más profesionales.
            Queremos realizar una página interactiva donde puedas ver el trabajo de muchos tatuadores, y como tatuador, puedas acceder a más clientes.
          </p>
        </Col>
        <Col md={6}>
          <h4 className="about-subtitle">Misión</h4>
          <p className="about-text">
            En MatchTattoo creemos que el tatuaje es más que una moda: es una forma de expresión, una historia en la piel, una obra de arte viviente.
          </p>
          <p>
            Nuestra misión es hacer más fácil descubrir, conectar y reservar citas con artistas del tatuaje, sin importar en qué parte del mundo estés.
          </p>
          <ul>
            <li>Ver perfiles de tatuadores con sus estilos y portafolios.</li>
            <li>Leer opiniones de otros usuarios.</li>
            <li>Contactar directamente y agendar citas.</li>
          </ul>
          <p>Al final del día, queremos que cada tatuaje cuente una historia, y que esa historia empiece acá.</p>
        </Col>
      </Row>

      {/* Sección equipo */}
      <h2 className="text-center mt-5 about-title">Nuestro Equipo</h2>
      <Row className="mt-4">
        {teamMembers.map((member, index) => (
          <Col key={index} md={4} lg={2} className="mb-4 mx-auto">
            <Card className="text-center team-card">
              <Card.Img
                variant="top"
                src={member.img}
                alt={member.name}
                className="team-img"
              />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Text>{member.role}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutUs;
