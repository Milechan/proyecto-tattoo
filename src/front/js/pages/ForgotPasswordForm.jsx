import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: "Recuperación de contraseña",
          message: "Haz clic en este enlace para restablecer tu contraseña"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error al enviar el correo');
      }

      Swal.fire({
        title: "Se ha enviado un correo con instrucciones para restablecer tu contraseña",
        icon: "success",
        draggable: true
      });

    } catch (error) {
      alert(error.message);
    }
  };


  const styles = {
    mainBg: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      backgroundImage: 'url("https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/gifs/tatuaje-arcoiris.gif")',
      backgroundSize: 'background-repeat',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 1
    },
    card: {
      border: 'none',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      maxWidth: '450px',
      position: 'relative',
      zIndex: 2
    },
    header: {
      backgroundColor: '#5c2d42',
      color: 'white',
      borderTopLeftRadius: '15px',
      borderTopRightRadius: '15px',
      padding: '1.5rem'
    },
    input: {
      borderRadius: '10px',
      border: '1px solid #dee2e6',
      padding: '12px 15px',
      marginBottom: '1.5rem'
    },
    button: {
      backgroundColor: '#8c3d5b',
      border: 'none',
      borderRadius: '10px',
      padding: '12px',
      fontWeight: '600',
      width: '100%',
      '&:hover': {
        backgroundColor: '#5c2d42'
      }
    },
    link: {
      color: '#8c3d5b',
      textDecoration: 'none',
      display: 'block',
      marginTop: '1rem',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  };

  return (
    <Container fluid style={styles.mainBg} className="d-flex align-items-center justify-content-center">
      <div style={styles.overlay}></div>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6} xl={4}>
          <Card style={styles.card}>
            <Card.Header style={styles.header} className="text-center">
              <h3>Recuperemos tu cuenta</h3>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Correo electrónico"
                    style={styles.input}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    style={styles.button}
                    className="text-white mb-3"
                  >
                    Enviar link de recuperación
                  </Button>
                </div>

                <Link
                  to="/login"
                  style={styles.link}
                  className="text-center"
                >
                  ← Volver al inicio de sesión
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordForm;