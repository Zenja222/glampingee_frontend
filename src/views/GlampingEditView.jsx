import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getGlampingById, updateGlamping} from "../client/BookingManagement";
import {Spinner} from "react-bootstrap";
import GlampingEditForm from "../components/GlampingEditForm";


function GlampingEditView() {
    const [glamping, setGlamping] = useState(null);
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchGlamping = async () => {
            try {
                const fetchedGlamping = await getGlampingById(id);
                setGlamping(fetchedGlamping);
            } catch (err) {
                console.error("Failed to fetch glamping", err);
                setError("Failed to fetch glamping details");
            } finally {
                setLoading(false); // Убедитесь, что загрузка завершается
            }
        };
        fetchGlamping();
    }, [id]);

    const handleGlampingUpdate = async (glamping) => {
        setLoading(true);
        try {
            const updatedGlamping = await updateGlamping(glamping.id, glamping);// Update the state with the new data
            console.log(updatedGlamping);
        } catch (error) {
            console.error("Failed to update glamping details", error);
            setError("Failed to update glamping details");
        } finally {
            setLoading(false); // Set loading state to false after update attempt
        }
    };

    return (
        <div className="text-center" style={{ marginTop: "75px" }}>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{minHeight: "300px"}}>
                    <Spinner animation="border"/>
                </div>
            ) : error ? (
                <div className="alert alert-danger mt-4">{error}</div>
            ) : (
                glamping && (
                    <div>
                        <GlampingEditForm handleGlampingUpdate={handleGlampingUpdate} glamping={glamping}/>
                    </div>
                )
            )}
        </div>
    );
}


export default GlampingEditView;
