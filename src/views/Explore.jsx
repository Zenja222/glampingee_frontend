import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Form, Modal } from 'react-bootstrap'; // Use Modal from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { getAll, deleteGlamping, searchByName, filterByPriceRange } from "../client/BookingManagement";
import './../Styles/explore.css';
import { FaTrash, FaPaintBrush } from "react-icons/fa";
import { useAuth } from "../routes/AuthProvider";
import { useTranslation } from 'react-i18next';
import { Range } from 'react-range';

function Explore() {
    const { t, i18n } = useTranslation();
    const [glampings, setGlampings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [tempMinPrice, setTempMinPrice] = useState(0);
    const [tempMaxPrice, setTempMaxPrice] = useState(1000);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const { role } = useAuth();

    const currentLanguage = i18n.language;

    useEffect(() => {
        loadGlampings();
    }, []);

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

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await searchByName(searchText, currentLanguage);
            setGlampings(data);
        } catch (error) {
            console.error("Failed to search glampings", error);
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
        e.stopPropagation();
        navigate(`/update/${id}`);
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

    const handleClearSearch = () => {
        setSearchText('');
        loadGlampings();
    };


    const toggleModal = () => {
        setShowModal(!showModal);
    };


    const applyFilters = () => {
        setTempMinPrice(tempMinPrice);
        setTempMaxPrice(tempMaxPrice);
        filterByPriceRangeEffect(tempMinPrice, tempMaxPrice);
        toggleModal();
    };

    const filterByPriceRangeEffect = async (min, max) => {
        try {
            setLoading(true);
            const data = await filterByPriceRange(min, max);
            setGlampings(data);
        } catch (error) {
            console.error("Failed to filter glampings by price range", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='main-content' style={{ marginTop: '90px' }}>
            <Container className="my-5">
                <div className="d-flex mb-3 align-items-center">
                    {/* Filters Button */}
                    <Button variant="primary" onClick={toggleModal}>
                        {showModal ? t('hide_filters') : t('filters')}
                    </Button>

                    {/* Search bar */}
                    <div className="ms-auto">
                        <Form className="d-flex mb-3" onSubmit={handleSearch}>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="me-2"
                            />
                            <Button type="submit" variant="primary">
                                Search
                            </Button>
                            <Button
                                type="button"
                                variant="danger"
                                onClick={handleClearSearch}
                            >
                                X
                            </Button>
                        </Form>
                    </div>

                    {role === 'admin' && (
                        <div className="ms-auto">
                            <Button
                                variant="success"
                                onClick={() => handleAddClick()}
                            >
                                {t('add_new_glamping')}
                            </Button>
                        </div>
                    )}
                </div>

                {loading ? (
                    <p>{t('loading_glampings')}</p>
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
                                                    handleDeleteClick(glamping.id, e);
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
                                        <Card.Title>
                                            {glamping.name[currentLanguage] || t('name_not_available')}
                                        </Card.Title>
                                        <Card.Text
                                            style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-evenly',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <span>{glamping.county || t('county_not_available')}</span>
                                                <span>{glamping.price ? `${glamping.price}€` : t('price_not_available')}</span>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>

            {/* Modal for Filters */}
            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('filter')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="primary" id="sort-field-dropdown">
                            {sortField ? t(sortField) : t('select_sort_field')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortField('name')}>{t('name')}</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortField('price')}>{t('price')}</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortField('county')}>{t('county')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="primary" id="sort-direction-dropdown">
                            {sortDirection === 'asc' ? t('ascending') : t('descending')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortDirection('asc')}>{t('ascending')}</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortDirection('desc')}>{t('descending')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Price Range Slider */}
                    <div className="mb-4">
                        <Range
                            step={1}
                            min={0}
                            max={1000}
                            values={[tempMinPrice, tempMaxPrice]}
                            onChange={(values) => {
                                setTempMinPrice(values[0]);
                                setTempMaxPrice(values[1]);
                            }}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '6px',
                                        width: '100%',
                                        backgroundColor: '#ddd',
                                        borderRadius: '4px',
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '20px',
                                        width: '20px',
                                        borderRadius: '10px',
                                        backgroundColor: '#007bff',
                                    }}
                                />
                            )}
                        />
                        <p>{t('price_range')} : {tempMinPrice}€ - {tempMaxPrice}€</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        {t('close')}
                    </Button>
                    <Button variant="primary" onClick={applyFilters}>
                        {t('apply_filters')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Explore;
