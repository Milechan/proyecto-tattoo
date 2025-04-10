import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { actions } = useContext(Context)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || 'Error al iniciar sesión')
        navigate("/RegisterForm");
      }
      localStorage.setItem('token', data.token);

      actions.changeUser(data.user);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  // Paleta de colores
  const styles = {
    mainBg: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      backgroundImage: 'url("https://i.gifer.com/RJHi.gif")',
      backgroundSize: 'background-repeat', // define si es en mosaico o no
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // efecto parallax
      position: 'relative' // esto es para el overlay
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
      position: 'relative',
      border: 'none',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    },
    header: {
      backgroundColor: '#5c2d42', // Vinotinto oscuro
      color: 'white',
      borderTopLeftRadius: '15px',
      borderTopRightRadius: '15px',
      padding: '1.5rem'
    },
    input: {
      borderRadius: '10px',
      border: '1px solid #dee2e6',
      padding: '12px 15px'
    },
    button: {
      backgroundColor: '#8c3d5b', // Vinotinto claro
      border: 'none',
      borderRadius: '10px',
      padding: '12px',
      fontWeight: '600',
      '&:hover': {
        backgroundColor: '#5c2d42'
      }
    },
    link: {
      color: '#8c3d5b',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  };

  return (

    <Container fluid style={styles.mainBg} className="d-flex align-items-center justify-content-center">
      <div style={styles.overlay} className="d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col md={6} lg={4}>
            <Card style={styles.card}>
              <Card.Header style={styles.header} className="text-center">
                <h3>Iniciar Sesión</h3>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={styles.input}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={styles.input}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid mb-3">
                    <Button
                      type="submit"
                      style={styles.button}
                      className="text-white"
                    >
                      Ingresar
                    </Button>
                  </div>

                  <div className="text-center">
                    <Link
                      to="/login/forgotpass"
                      style={styles.link}
                    >
                      ¿Has olvidado tu contraseña?
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

    </Container>
  );
};

export default LoginForm;