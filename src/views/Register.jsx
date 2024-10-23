import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../firebase";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const addUserToFirestore = async (user) => {
        try {
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                role: 'user'
            });
            console.log('User added to Firestore with role: user');
        } catch (error) {
            console.error('Error adding user to Firestore:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User registered:', user);

            await addUserToFirestore(user);

            navigate('/');
        } catch (error) {
            console.error('Error registering:', error.message);
            alert(error.message);
        }
    };

    return (
        <div>
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Row className="w-100">
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="text-center mb-4">Sign Up</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignUp;
