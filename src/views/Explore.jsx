import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import { getAll, filterByField } from "../client/BookingManagement";
import {deleteGlamping} from "../client/BookingManagement";
import './../Styles/explore.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {FaTrash, FaPaintBrush} from "react-icons/fa";
import {useAuth} from "../routes/AuthProvider";

function Explore() {
    const [glampings, setGlampings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();
    const {role} = useAuth();
    const {id} = useParams();


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
    const deleteGlampingById = async (id) => {
        try {
            await deleteGlamping(id);
            setGlampings((prevGlampings) => prevGlampings.filter(glamping => glamping.id !== id));
        } catch (error) {
            console.error("Failed to delete glamping", error);
        }
    };

    const handleEditClick = (id, e) => {
        e.stopPropagation(); // Prevent event bubbling
        navigate(`/update/${id}`); // Change to your edit view path
    };

    const handleCardClick = (id) => {
        navigate(`/glamping/${id}`);
    };

    const handleAddClick = () => {
        navigate(`/add`);
    };

    const handleDeleteClick = (id, e) => {
        e.stopPropagation();
        deleteGlampingById(id);
    };

    return (
        <div className='main-content' style={{ marginTop: '90px' }}>
            <Container className="my-5">

                <div className="d-flex mb-3">

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
                        disabled={!sortField}
                    >
                        Filter
                    </Button>
                    {role === 'admin' && (
                    <div className="ms-auto">
                        <Button
                            variant="success"
                            onClick={() => handleAddClick()}
                        >
                            Add new glamping
                        </Button>
                    </div>
                        )}
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
                                    {role === 'admin' && (
                                        <>
                                        <FaTrash
                                            className='trash'
                                            onClick={(e) => {
                                                handleDeleteClick(glamping.id,e);
                                            }}
                                        />
                                            <FaPaintBrush className='brush'
                                                          onClick={(e) => handleEditClick(glamping.id, e)}
                                            />
                                        </>
                                    )}
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
