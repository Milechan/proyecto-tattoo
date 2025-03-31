import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

const RegisterForm = () => {
  const [isTattooer, setIsTattooer] = useState(false);

  // Paleta de colores
  const styles = {
    mainBg: { 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh',
      padding: '2rem 0'
    },
    card: {
      border: 'none',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    header: {
      backgroundColor: '#5c2d42',
      color: 'white',
      padding: '1.5rem',
      textAlign: 'center'
    },
    title: {
      color: '#5c2d42',
      marginBottom: '1.5rem',
      fontWeight: '600'
    },
    input: {
      borderRadius: '10px',
      border: '1px solid #dee2e6',
      padding: '12px 15px',
      marginBottom: '1rem'
    },
    select: {
      borderRadius: '10px',
      border: '1px solid #dee2e6',
      padding: '12px 15px',
      color: '#495057',
      appearance: 'auto',
      WebkitAppearance: 'menulist',
    },
    button: {
      backgroundColor: '#8c3d5b',
      border: 'none',
      borderRadius: '10px',
      padding: '12px',
      fontWeight: '600',
      width: '100%',
      marginTop: '1rem',
      '&:hover': {
        backgroundColor: '#5c2d42'
      }
    },
    checkboxLabel: {
      color: '#495057',
      marginLeft: '0.5rem'
    }
  };

  return (
    <Container fluid style={styles.mainBg} className="d-flex align-items-center">
      <Row className="justify-content-center w-100">
        <Col md={10} lg={8} xl={6}>
          <Card style={styles.card}>
            <Card.Header style={styles.header}>
              <h2>CONECTA CON EL ARTE EN TU PIEL</h2>
            </Card.Header>
            <Card.Body className="p-4 p-md-5">
              <Form>
                <h4 style={styles.title}>Crea tu cuenta</h4>
                
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Control 
                      placeholder="Nombre" 
                      style={styles.input}
                      required 
                    />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Control 
                      placeholder="Apellido" 
                      style={styles.input}
                      required 
                    />
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control 
                    type="date" 
                    style={styles.input}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control 
                    type="email" 
                    placeholder="Correo electrónico" 
                    style={styles.input}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control 
                    type="password" 
                    placeholder="Contraseña" 
                    style={styles.input}
                    required 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control 
                    type="text" 
                    placeholder="Instagram (opcional)" 
                    style={styles.input}
                  />
                </Form.Group>

                <Form.Check 
                  type="checkbox"
                  id="tattooer-check"
                  label="Soy tatuador"
                  className="mb-3"
                  

                >
                  <Form.Check.Input type="checkbox" onClick={(e) => {console.log("Click en soy tatuador"); setIsTattooer(true)}}/>
                  <Form.Check.Label style={styles.checkboxLabel}>
                    Soy tatuador
                  </Form.Check.Label>
                </Form.Check>

                {isTattooer && (
                  <Form.Group className="mb-3">
                    <Form.Select style={styles.select}
                    onChange={(e) => console.log(e.target.value)}>
                      <option>Selecciona tu categoría</option>
                      <option>Minimalism</option>
                      <option>FullColor</option>
                      <option>Realismo</option>
                      <option>Tradicional</option>
                    </Form.Select>
                  </Form.Group>
                )}

                <Form.Check 
                  type="checkbox"
                  id="terms-check"
                  className="mb-4"
                  required
                >
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label style={styles.checkboxLabel}>
                    Acepto los términos y condiciones
                  </Form.Check.Label>
                </Form.Check>

                <Button 
                  type="submit" 
                  style={styles.button}
                  className="text-white"
                >
                  Registrarse
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;