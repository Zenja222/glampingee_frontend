import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGlampingById } from '../client/BookingManagement';
import {Card, Spinner} from 'react-bootstrap';
import '../Styles/glampingDetail.css';

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
        return <div> {error}</div>;
    }
    if (!glamping) {
        return <div>Glamping details not found</div>;  // Handle case when glamping is null or undefined
    }

    return (

        <Card>
            <Card.Img variant="top" src={glamping.picture || "/path/to/default-image.jpg"} style={{ height: '400px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title>{glamping.name}</Card.Title>
                <Card.Text>{glamping.description || "No description available."}</Card.Text>
                <Card.Text>
                    <strong>Location:</strong> {glamping.location}
                </Card.Text>
                <Card.Text>
                    <strong>Price:</strong> {glamping.price} EUR per night
                </Card.Text>
                <Card.Text>
                    <strong>Amenities:</strong> {glamping.amenities ? glamping.amenities.join(', ') : "Not specified"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default GlampingDetail;