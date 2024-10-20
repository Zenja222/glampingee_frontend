import axios from "axios";
export const getAll = async () => {
    try {
        const response =
            await axios.get('http://localhost:8080/glamping');
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Super Network Error:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        throw error;
    }
};
export const getGlampingById = async (id) => {
    try {
        const response =
            await axios.get(`http://localhost:8080/glamping/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Super Network Error:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        throw error;
    }
};
export const filterGlamping = async () => {
    try {
        const response =
            await axios.get(`http://localhost:8080/glamping/filter`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Super Network Error:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        throw error;
    }
};