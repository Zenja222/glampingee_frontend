import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addRating, getAverageRating, getGlampingById } from '../client/BookingManagement';
import { Button, Card, Col, Container, Row, Spinner, Alert } from 'react-bootstrap';
import './../Styles/glampingDetail.css';
import { useAuth } from "../routes/AuthProvider";
import Rating from 'react-rating-stars-component';
import { useTranslation } from 'react-i18next';

function GlampingDetail() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [glamping, setGlamping] = useState(null);
    const [review, setReview] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchGlamping = async () => {
            try {
                const data = await getGlampingById(id);
                setGlamping(data);
            } catch (error) {
                console.error("Failed to load glamping details", error);
                setError(t("error.load_glamping"));
            } finally {
                setLoading(false);
            }
        };

        const fetchReviewData = async () => {
            try {
                const reviewData = await getAverageRating(id);
                setReview(reviewData);
            } catch (error) {
                console.error("Failed to load review data", error);
                setError("Failed to load review data");
            } finally {
                setLoading(false);
            }
        };

        fetchReviewData();
        fetchGlamping();
    }, [id, t]);

    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
        console.log("Selected Rating: ", newRating);
    };

    const submitReview = async () => {
        try {
            await addRating(id, userRating);
            alert(t('success.review_submitted'));
        } catch (error) {
            console.error("Failed to submit review", error);
            alert(t('error.review_failed'));
        }
    };

    const handleNextImage = () => {
        if (glamping && currentImageIndex < glamping.picture.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePreviousImage = () => {
        if (glamping && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    if (loading) {
        return (
            <div className="text-center w-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">{t('loading')}</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger" className="text-center">{error}</Alert>;
    }

    if (!glamping) {
        return <Alert variant="warning" className="text-center">{t('error.glamping_not_found')}</Alert>;
    }

    return (
        <div className='over-card-bg'>
            <Container className='card-container'>
                <Row className='g-5 justify-content-evenly'>
                    <Col className='lg-6'>
                        <Card className='custom-card'>
                            <Row className='g-0'>
                                <div className='col-6 col-md-5'>
                                    <Card.Img
                                        src={glamping.picture[currentImageIndex]}
                                        className='card-image'
                                        alt={t('glamping_image')}
                                    />
                                    {glamping.picture.length > 1 && (
                                        <div className="image-navigation">
                                            <Button
                                                variant="secondary"
                                                onClick={handlePreviousImage}
                                                disabled={currentImageIndex === 0}
                                                className="me-2"
                                            >
                                                {t('previous')}
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={handleNextImage}
                                                disabled={currentImageIndex === glamping.picture.length - 1}
                                            >
                                                {t('next')}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className='col-6 col-md-7'>
                                    <Card.Body className='another-class-body'>
                                        <Card.Title>{glamping.name[currentLanguage] || t('name_not_available')}</Card.Title>
                                        <Card.Subtitle className='mb-2'>{glamping.county || t('county_not_available')}</Card.Subtitle>
                                        <Card.Text>{glamping.description[currentLanguage] || t('no_description')}</Card.Text>
                                        <Card.Text className='fw-bold'>
                                            {glamping.price ? `€${glamping.price}` : t('price_not_available')}
                                        </Card.Text>
                                        <Card.Text className='fw-bold'>
                                            {t('rating')}: {review ? review.toFixed(1) : t('no_reviews')}
                                        </Card.Text>

                                        {currentUser ? (
                                            <>
                                                <Card.Text>{t('leave_your_rating')}</Card.Text>
                                                <Rating
                                                    count={5}
                                                    value={userRating}
                                                    size={30}
                                                    activeColor="#ffd700"
                                                    onChange={handleRatingChange}
                                                />
                                                <Button onClick={submitReview} className="mt-2">{t('submit_review')}</Button>
                                                {glamping.linkToBook && (
                                                    <div className="mt-3">
                                                        <Button
                                                            href={glamping.linkToBook}
                                                            target="_blank"
                                                            variant="primary"
                                                            className="w-100 mt-2"
                                                        >
                                                            {t('book_now')}
                                                        </Button>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <Card.Text>
                                                {t('want_to_leave_review')} <br />
                                                <a href="/login">{t('login')}</a>
                                                <span> {t('or')} </span>
                                                <a href="/register">{t('register')}</a>
                                            </Card.Text>
                                        )}
                                    </Card.Body>
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
