import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteGlamping, getAll, getAverageRating} from "../client/BookingManagement";
import './../Styles/explore.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {FaTrash} from "react-icons/fa";
import {useAuth} from "../routes/AuthProvider";

function Explore() {
    const [glampings, setGlampings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {role} = useAuth();
    const {id} = useParams();


    const loadGlampings = async () => {
        try {
            setLoading(true);
            const data = await getAll();
            setGlampings(data);
            const updatedGlampings = await Promise.all(data.map(async (glamping) => {
                const review = await getAverageRating(glamping.id);
                return { ...glamping, review }; // Добавляем рейтинг в объект глэмпинга
            }));
            setGlampings(updatedGlampings);
        } catch (error) {
            console.error("Failed to load glampings", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteGlampingById = async (id) => {
        try {
            await deleteGlamping(id); // Удаляем глэмпинг по ID
            // После успешного удаления обновляем список глэмпингов
            setGlampings((prevGlampings) => prevGlampings.filter(glamping => glamping.id !== id));
        } catch (error) {
            console.error("Failed to delete glamping", error);
        }
    };

    useEffect(() => {
        loadGlampings();
    }, []);

    const handleDeleteClick = (id, e) => {
        e.stopPropagation(); // Предотвратить всплытие события
        deleteGlampingById(id); // Вызов функции удаления
    };

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
                                style={{ cursor: 'pointer',height:'620px' }}
                            >
                                {role === 'admin' && (
                                    <FaTrash
                                        className='trash'
                                        onClick={(e) => {
                                            handleDeleteClick(glamping.id,e);
                                        }}
                                    />
                                )}

                                <Card.Img variant="top" src={glamping.picture[0] || "https://via.placeholder.com/150"} alt="Card image" />
                                <Card.Body>
                                    <Card.Title>{glamping.name}</Card.Title>
                                    <Card.Text style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3, // Adjust the number of visible lines
                                        WebkitBoxOrient: 'vertical' }}>
                                        {glamping.county || "No description available."} <br/>
                                        Rating: {glamping.review ? glamping.review.toFixed(1) : "No reviews yet"}
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



