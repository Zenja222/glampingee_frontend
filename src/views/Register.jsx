import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    return (
        <div>
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Row className="w-100">
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="text-center mb-4">Register</h2>

                        <Form>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>


                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" />
                            </Form.Group>


                            <Button variant="success" type="submit" className="w-100"
                                    onClick={() => navigate(`/explore`)}>
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register;
