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
            <Container className='margin-top 5 flex-fill'>
                <Row className="g-1 row-cols-1 row-cols-md-4 row">
                    {glampings.length > 0 ? (
                        glampings.map((glamping) => (
                            <Col key={glamping.id}>
                                <Card className='custom-card ' onClick={() => navigate(`/glamping/${glamping.id}`)}>
                                    <Card.Img variant="top" src={glamping.picture || "/path/to/default-image.jpg"}
                                              style={{position: 'absolute',
                                                  top: 0,
                                                  left: 0,
                                                  width: '100%',
                                                  height: '100%',
                                                  objectFit: 'cover',
                                                  zIndex: 1}}/>
                                    <Card.Body className='custom-card-body'
                                               style={{
                                                   position: 'absolute',
                                                   bottom: 0,
                                                   left: 0,
                                                   right: 0,
                                                   zIndex: 2,  // Ensures it's on top of the image
                                                   backgroundColor: 'transparent',  // Semi-transparent black background
                                                   color: 'white',  // Text color
                                                   padding: '1rem',
                                                   textAlign: 'center'}}>
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
    );
}

export default Menu;
