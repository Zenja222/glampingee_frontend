import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import GlampingAddForm from "../components/GlampingAddForm";
import { addGlamping } from "../client/BookingManagement";

function GlampingAddView() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleGlampingAdd = async (glamping) => {
        try {
            setLoading(true);
            await addGlamping(glamping);
            console.log("Glamping added successfully:", glamping);
        } catch (error) {
            console.error("Failed to create glamping details", error);
            setError("Failed to create glamping details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-center" style={{ marginTop: "75px" }}>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <div className="alert alert-danger mt-4">{error}</div>
            ) : (
                <GlampingAddForm handleGlampingAdd={handleGlampingAdd} />
            )}
        </div>
    );
}

export default GlampingAddView;
