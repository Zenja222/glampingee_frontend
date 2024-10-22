import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGlampingById } from '../client/BookingManagement';
import { Card, CardBody, Col, Container, Row, Spinner } from 'react-bootstrap';
import './../Styles/glampingDetail.css';

function GlampingDetail() {
    const { id } = useParams();
    const [glamping, setGlamping] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGlamping = async () => {
            try {
                const data = await getGlampingById(id);
                setGlamping(data);
            } catch (error) {
                console.error("Failed to load glamping details", error);
                setError("Failed to load glamping details");
            } finally {
                setLoading(false);
            }
        };

        fetchGlamping();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center w-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!glamping) {
        return <div>Glamping details not found</div>;
    }

    return (
        <div className='over-card-bg' style={{ marginTop: '50px' }}>
            <Container>
                <Row className='g-5 justify-content-evenly'>
                    <Col className='lg-6'>
                        <Card className='custom-card'>
                            <Row className='g-0'>
                                <div className='col-6 col-md-5'>
                                    <Card.Img
                                        src={glamping.picture[0]}
                                        className='card-image img-fluid rounded-start'
                                        alt='glamping-picture'
                                    />
                                </div>
                                <div className='col-6 col-md-7'>
                                    <CardBody className='another-class-body'>
                                        <Card.Title>{glamping.name}</Card.Title>
                                        <Card.Subtitle className='mb-2 '>{glamping.county}</Card.Subtitle>
                                        <Card.Text>{glamping.description || "No description available."}</Card.Text>
                                        <Card.Text className='fw-bold'>{glamping.price ? `$${glamping.price}` : "Price not available."}</Card.Text>
                                    </CardBody>


                                </div>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default GlampingDetail;

