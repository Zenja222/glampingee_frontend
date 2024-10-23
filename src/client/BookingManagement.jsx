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
}
export const addRating = async (id, rating) => {
    try {
        const response =
            await axios.post(`http://localhost:8080/reviews/${id}`, null,{
                params: {
                    rating: rating
                }
            });
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
}

    export const getAverageRating = async (id) => {
        try {
            const response =
                await axios.get(`http://localhost:8080/reviews/average/${id}`);
            return response.data;
        } catch (error) {
            if (error.response) {

                console.error('Server Error:', error.response.data);
            } else if (error.request) {

                console.error('Super Network Error:', error.request);
            } else {

                console.error('Error:', error.message);
            }
            throw error;
        }
};
export const filterByField = async (sortField, sortDirection) => {
    const response = await axios.get(`http://localhost:8080/glamping/filter`, {
        params: { sortField, sortDirection }
    });
    return response.data;
};