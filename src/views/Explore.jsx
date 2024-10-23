import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAll, filterByField } from "../client/BookingManagement";
import './../Styles/explore.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Explore() {
    const [glampings, setGlampings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();


    useEffect(() => {
        loadGlampings();
    }, []);

    // Load unfiltered glampings
    const loadGlampings = async () => {
        try {
            setLoading(true);
            const data = await getAll();
            setGlampings(data);
        } catch (error) {
            console.error("Failed to load glampings", error);
        } finally {
            setLoading(false);
        }
    };


    const loadFilteredGlampings = async (field, direction) => {
        try {
            setLoading(true);
            const data = await filterByField(field, direction);
            setGlampings(data); // Set filtered glamping data directly
        } catch (error) {
            console.error("Failed to load filtered glampings", error);
        } finally {
            setLoading(false);
        }
    };


    const handleCardClick = (id) => {
        navigate(`/glamping/${id}`);
    };

    return (
        <div className='main-content' style={{ marginTop: '90px' }}>
            <Container className="my-5">

                <div className="d-flex justify-content-between mb-3">

                    <Dropdown className="me-2">
                        <Dropdown.Toggle variant="primary" id="sort-field-dropdown">
                            {sortField || 'Select Sort Field'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortField('name')}>Name</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortField('price')}>Price</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortField('county')}>County</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    <Dropdown className="me-2">
                        <Dropdown.Toggle variant="primary" id="sort-direction-dropdown">
                            {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortDirection('asc')}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortDirection('desc')}>Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    <Button
                        variant="success"
                        onClick={() => loadFilteredGlampings(sortField, sortDirection)}
                        disabled={!sortField} // Disable if no sort field is selected
                    >
                        Filter
                    </Button>
                </div>


                {loading ? (
                    <p>Loading glampings...</p>
                ) : (
                    <Row>
                        {glampings.map((glamping, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card
                                    className="text-center explore-card"
                                    onClick={() => handleCardClick(glamping.id)}
                                    style={{ cursor: 'pointer', height: '620px' }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={glamping.picture[0] || "https://via.placeholder.com/150"}
                                        alt="Card image"
                                    />
                                    <Card.Body>
                                        <Card.Title>{glamping.name}</Card.Title>
                                        <Card.Text style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {glamping.county || "No description available."}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
}

export default Explore;
