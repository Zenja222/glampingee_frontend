import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    sendEmailVerification,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from "../firebase";
import { useTranslation } from 'react-i18next';

function SignUp() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const googleProvider = new GoogleAuthProvider();

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
        setPasswordError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User registered:', user);
            await sendEmailVerification(user);
            alert('Verification email sent! Please check your inbox.');
            await addUserToFirestore(user);

            navigate('/');
        }catch (error) {
            console.error('Error registering:', error.message);
            if (error.code === 'auth/weak-password') {
                setPasswordError('Password should be at least 6 characters long.');
            } else if (error.code === 'auth/email-already-in-use') {
                setPasswordError('This email is already registered.');
            } else {
                setPasswordError(error.message);
            }
        }
    }

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('Google sign-in successful:', user);

            await addUserToFirestore(user);
            navigate('/');
        } catch (error) {
            console.error('Error with Google sign-in:', error.message);
            alert(error.message);
        }
    };

    return (
        <div>
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Row className="w-100">
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="text-center mb-4">{t('sign_up')}</h2>

                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>{t('email_address')}</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={t('enter_email')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>{t('password')}</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder={t('enter_password')}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                {passwordError && (
                                    <Form.Text className="text-danger">
                                        {passwordError}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                                {t('sign_up')}
                            </Button>

                            <Button variant="danger" onClick={handleGoogleSignUp} className="w-100 mt-2">
                                {t('sign_up_with_google')}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignUp;
