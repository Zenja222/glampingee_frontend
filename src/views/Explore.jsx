import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAll } from "../client/BookingManagement";
import './../Styles/explore.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Explore() {
    const [glampings, setGlampings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadGlampings = async () => {
        try {
            const data = await getAll();
            setGlampings(data);
        } catch (error) {
            console.error("Failed to load glampings", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGlampings();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/glamping/${id}`);
    };

    return (
        <div className='main-content' style={{ marginTop: '90px' }}>
            <Container className="my-5">
                <Row>
                    {glampings.map((glamping, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card
                                className="text-center explore-card"
                                onClick={() => handleCardClick(glamping.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card.Img variant="top" src={glamping.picture[0] || "https://via.placeholder.com/150"} alt="Card image" />
                                <Card.Body>
                                    <Card.Title>{glamping.name}</Card.Title>
                                    <Card.Text>
                                        {glamping.county || "No description available."}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Explore;



