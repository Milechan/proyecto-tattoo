import React, { useContext, useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { actions } = useContext(Context)
  const navigate = useNavigate()

  const handleCreateProfile = async (categoryName, token) => {
    const userProfile = {
      category_name: categoryName
    }
    try {
      const response = await fetch('http://localhost:3001/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(userProfile)
      })
      const data = await response.json()
      if (!response.ok) {

      }
      Swal.fire({

        title: "Inicio exitoso!",
        icon: "success",
        draggable: true
      });

    } catch (error) {
      console.error("Error creando el perfil:", error);

      Swal.fire({
        icon: "error",
        title: "Error al crear perfil",
        text: "Ocurrió un error al intentar crear el perfil. Intenta nuevamente.",
        confirmButtonColor: "#5c2d42"
      });
    }
  }
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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.msg || "Error al iniciar sesión",
          confirmButtonText: "Reintentar",
          confirmButtonColor: "#5c2d42"
        }).then(() => {
          navigate("/Login");
        });
        return;
      }

      localStorage.setItem('token', data.token);

      actions.changeUser(data.user);
      console.warn("datos recibidos: ", data.user);

      if (data.user.user_type.name == "tattooer" && data.user.profile == null) {
        await handleCreateProfile(data.user.category.name, data.token)
      }
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };


  const styles = {
    mainBg: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      backgroundImage: 'url("https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/gifs/RJHi.gif")',
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
      position: 'relative',
      border: 'none',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
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
      padding: '12px 15px'
    },
    button: {
      backgroundColor: '#8c3d5b',
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