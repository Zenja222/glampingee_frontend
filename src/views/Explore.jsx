import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAll, filterByField } from "../client/BookingManagement";
import './../Styles/explore.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Explore() {
    const [glampings, setGlampings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState(''); // No sort field initially
    const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction
    const navigate = useNavigate();

    // Load all glampings on initial render
    useEffect(() => {
        loadGlampings();
    }, []);

    // Load unfiltered glampings
    const loadGlampings = async () => {
        try {
            setLoading(true); // Set loading to true while fetching data
            const data = await getAll();
            setGlampings(data); // Set glamping data directly
        } catch (error) {
            console.error("Failed to load glampings", error);
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    // Load filtered glampings when the user selects a sort field
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

    // Handle card click to navigate to the glamping detail page
    const handleCardClick = (id) => {
        navigate(`/glamping/${id}`);
    };

    return (
        <div className='main-content' style={{ marginTop: '90px' }}>
            <Container className="my-5">
                {/* Dropdowns for Sorting */}
                <div className="d-flex justify-content-between mb-3">
                    {/* First Dropdown for Sort Field */}
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

                    {/* Second Dropdown for Sort Direction */}
                    <Dropdown className="me-2">
                        <Dropdown.Toggle variant="primary" id="sort-direction-dropdown">
                            {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortDirection('asc')}>Ascending</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortDirection('desc')}>Descending</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Search Button */}
                    <Button
                        variant="success"
                        onClick={() => loadFilteredGlampings(sortField, sortDirection)}
                        disabled={!sortField} // Disable if no sort field is selected
                    >
                        Filter
                    </Button>
                </div>

                {/* Display glampings */}
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
