import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAll } from "../client/BookingManagement";
import './../Styles/menu.css';


function Menu() {
    const [glampings, setGlampings] = useState([]);
    const navigate = useNavigate();

    const loadGlampings = async () => {
        try {
            const data = await getAll();
            setGlampings(data);
        } catch (error) {
            console.error("Failed to load glampings", error);
        }
    };

    useEffect(() => {
        loadGlampings();
    }, []);

    return (
        <div className='main-content'>
            <Container className="text-center">
                <h1>Welcome to Glamping Estonia!</h1>
                <p>Explore the best glamping sites across Estonia.</p>
            </Container >

            {/* Card Row in the Middle of the Screen */}
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '60vh' }}>
                <Container>
                    <Row xs={1} md={2} className="g-4">
                        {glampings.length > 0 ? (
                            glampings.map((glamping) => (
                                <Col key={glamping.id}>
                                    <Card className='custom-card' onClick={() => navigate(`/glamping/${glamping.id}`)}>
                                        <Card.Img variant="top" src={glamping.picture || "/path/to/default-image.jpg"} />
                                        <Card.Body className='custom-card-body'>
                                            <Card.Title>{glamping.name}</Card.Title>
                                            <Card.Text>{glamping.description || "No description available."}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <div className="text-center w-100">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        )}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Menu;
