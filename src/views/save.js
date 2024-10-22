import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import React from "react";

<div className='main-content '>
    <Container className="text-left my-4 mt-5">
        <h1>Welcome to Glamping Estonia!</h1>
        <p>Explore the best glamping sites across Estonia.</p>
    </Container>

    <Container className='d-flex'>
        <Row className="col-12 gy-5">
            {loading ? (
                <div className="text-center w-100">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                glampings.length > 0 ? (
                    glampings.map((glamping) => (
                        <Col key={glamping.id} md={6} className="d-flex">
                            <Card
                                className='explore-custom-card flex-fill d-flex flex-column'
                                onClick={() => navigate(`/glamping/${glamping.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className='image-container'>
                                    <Card.Img
                                        variant="top"
                                        src={glamping.picture[0] || "/path/to/default-image.jpg"}
                                        className='card-image'
                                    />
                                </div>
                                <Card.Body className='card-body d-flex flex-column '>
                                    <div>
                                        <Card.Title style={{ color: 'white' }}>{glamping.name}</Card.Title>
                                        <Card.Text style={{ color: 'white' }}>
                                            <i className="bi bi-geo-alt me-2"></i> {glamping.county || "Location not available."}
                                        </Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <div className="text-center w-100">
                        <p>No glamping sites available.</p>
                    </div>
                )
            )}
        </Row>
    </Container>

</div>