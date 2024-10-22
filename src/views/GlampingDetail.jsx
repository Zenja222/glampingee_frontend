import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {addRating, getAverageRating, getGlampingById} from '../client/BookingManagement';
import {Button, Card, CardBody, Col, Container, Row, Spinner} from 'react-bootstrap';
import './../Styles/glampingDetail.css';
import {useAuth} from "../routes/AuthProvider";
import Rating from 'react-rating-stars-component';

function GlampingDetail() {
    const {id} = useParams();
    const [glamping, setGlamping] = useState(null);
    const [review, setReview] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {role} = useAuth();

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
        fetchGlamping();
        fetchReviewData();
    }, [id]);


    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
        console.log("Selected Rating: ", newRating);
    };

    const submitReview = async () => {
        try {
            await addRating(id, userRating);  // Submitting the user rating
            alert('Review submitted successfully!');
        } catch (error) {
            console.error("Failed to submit review", error);
            alert('Failed to submit review');
        }
    };

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
        <div className='over-card-bg' style={{marginTop: '50px'}}>
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
                                        <Card.Text className='fw-bold'>
                                            {glamping.price ? `$${glamping.price}` : "Price not available."}
                                        </Card.Text>
                                        {review ? (
                                            <Card.Text className='fw-bold'>Rating: {review.toFixed(1)}</Card.Text>
                                        ) : (
                                            <Card.Text className='fw-bold'>No reviews yet.</Card.Text>
                                        )}
                                        {(role === 'user' || role === 'admin') ? (
                                            <>
                                                <Card.Text>Leave your rating:</Card.Text>
                                                <Rating
                                                    count={5}
                                                    value={userRating}
                                                    size={30}
                                                    activeColor="#ffd700"
                                                    onChange={handleRatingChange}
                                                />
                                                <Button onClick={submitReview} className="mt-2">Submit Review</Button>
                                            </>
                                        ) : (
                                            <Card.Text>
                                                Want to leave a review? <br/>
                                                <a href="/login">Login</a>
                                                <span> or </span>
                                                <a href="/register"> Register</a>
                                            </Card.Text>
                                        )}
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


