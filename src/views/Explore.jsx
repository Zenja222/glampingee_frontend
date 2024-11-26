import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Dropdown, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAll, filterByField, deleteGlamping, searchByName, filterByPriceRange } from "../client/BookingManagement";
import './../Styles/explore.css';
import { FaTrash, FaPaintBrush } from "react-icons/fa";
import { useAuth } from "../routes/AuthProvider";
import { useTranslation } from 'react-i18next';
import { Range } from 'react-range'; // Import Range slider

function Explore() {
    const { t, i18n } = useTranslation();
    const [glampings, setGlampings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const { role } = useAuth();

    // Modal state for filters
    const [showFiltersModal, setShowFiltersModal] = useState(false);

    // State for slider values, without triggering immediate re-render
    const [tempMinPrice, setTempMinPrice] = useState(0);
    const [tempMaxPrice, setTempMaxPrice] = useState(1000);

    // Actual price filters that are applied when clicking 'Apply Filters'
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const currentLanguage = i18n.language;

    useEffect(() => {
        loadGlampings();
    }, []);

    useEffect(() => {
        const filterByPriceRangeEffect = async () => {
            try {
                setLoading(true);
                const data = await filterByPriceRange(minPrice, maxPrice);
                setGlampings(data);
            } catch (error) {
                console.error("Failed to filter glampings by price range", error);
            } finally {
                setLoading(false);
            }
        };

        if (minPrice || maxPrice) {
            filterByPriceRangeEffect();
        } else {
            loadGlampings();
        }
    }, [minPrice, maxPrice]);

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

    const loadFilteredGlampings = async (field, direction) => {
        try {
            setLoading(true);
            const data = await filterByField(field, direction);
            setGlampings(data);
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

    const handleFilterApply = () => {
        // Apply the filter only when the "Apply Filters" button is clicked
        setMinPrice(tempMinPrice);
        setMaxPrice(tempMaxPrice);
        loadFilteredGlampings(sortField, sortDirection);

        // Reset sort field and direction after applying filters
        setSortField('');
        setSortDirection('');

        setShowFiltersModal(false); // Close the modal after applying
    };

    return (
        <div className='main-content' style={{ marginTop: '90px' }}>
            <Container className="my-5">
                <div className="d-flex mb-3 align-items-center">
                    <Button variant="primary" onClick={() => setShowFiltersModal(true)}>
                        {t('filters')}
                    </Button>
                    {/* Search bar */}
                    <div className="ms-auto">
                        <Form className="d-flex mb-3" onSubmit={handleSearch}>
                            <Form.Control
                                type="text"
                                placeholder={t("search")}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="me-2"
                            />
                            <Button type="submit" variant="primary">
                                {t("search")}
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

            {/* Filters Modal */}
            <Modal show={showFiltersModal} onHide={() => setShowFiltersModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('filters')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="primary" id="sort-field-dropdown">
                            {sortField || t('select_sort_field')}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortField('name')}>{t('name')}</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortField('county')}>{t('county')}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="primary" id="sort-direction-dropdown">
                            {sortDirection === '' ? t('select_sort_field') : (sortDirection === 'asc' ? t('ascending') : t('descending'))}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortDirection('asc')}>
                                {t('ascending')}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortDirection('desc')}>
                                {t('descending')}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Price Range Slider */}
                    <div>
                        <h5>{t('price_range')}</h5>
                        <Range
                            step={10}
                            min={0}
                            max={1000}
                            values={[tempMinPrice, tempMaxPrice]} // Use the tempMinPrice and tempMaxPrice values
                            onChange={(values) => {
                                setTempMinPrice(values[0]);  // Update the min value when slider changes
                                setTempMaxPrice(values[1]);  // Update the max value when slider changes
                            }}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '6px',
                                        borderRadius: '3px',
                                        background: 'gray',
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
                                        height: '15px',
                                        width: '15px',
                                        borderRadius: '50%',
                                        backgroundColor: '#2C3E50',
                                    }}
                                />
                            )}
                        />
                        {/* Display the min and max price values */}
                        <div className="d-flex justify-content-between">
                            <span>{t('min')}: {tempMinPrice}€</span> {/* Display min price */}
                            <span>{t('max')}: {tempMaxPrice}€</span> {/* Display max price */}
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowFiltersModal(false)}>
                        {t('close')}
                    </Button>
                    <Button variant="primary" onClick={handleFilterApply}>
                        {t('apply_filters')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Explore;
