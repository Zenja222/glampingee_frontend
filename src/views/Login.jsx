import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', userCredential.user);

            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error.message);
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Row className="w-100">
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="text-center mb-4">Login</h2>

                        {error && <p className="text-danger text-center">{error}</p>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Обновляем email при вводе
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Обновляем пароль при вводе
                                    required
                                />
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
