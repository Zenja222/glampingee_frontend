import axios from "axios";

export const getAll = async () => {
    try {
        const response =
            await axios.get('http://https://cld5-193-40-147-101.ngrok-free.app/glamping');
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
            await axios.get(`http://https://cld5-193-40-147-101.ngrok-free.app/glamping/${id}`);
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
            await axios.get(`http://https://cld5-193-40-147-101.ngrok-free.app/glamping/filter`);
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
            await axios.post(`http://https://cld5-193-40-147-101.ngrok-free.app/reviews/${id}`, null, {
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
            await axios.get(`http://https://cld5-193-40-147-101.ngrok-free.app/reviews/average/${id}`);
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

export const filterByField = async (sortField, sortDirection) => {
    try {
        const response = await axios.get(`http://https://cld5-193-40-147-101.ngrok-free.app/glamping/filter`, {
            params: {sortField, sortDirection}
        });
        return response.data; // This will return the filtered glamping data
    } catch (error) {
        console.error("Error fetching filtered glampings:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

export const updateGlamping = async (id,glamping) => {
    try {
        const response =
            await axios.put(`http://https://cld5-193-40-147-101.ngrok-free.app/glamping/${id}`, glamping);
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

export const addGlamping = async (glamping) => {
    try {
        const response =
            await axios.post('http://https://cld5-193-40-147-101.ngrok-free.app/glamping', glamping);
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
export const searchByName = async (keyword,language) => {
    try {
        const response =
            await axios.get('http://https://cld5-193-40-147-101.ngrok-free.app/glamping/search', {params: {keyword, language}});
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
export const filterByPriceRange = async (minPrice, maxPrice) => {
    try {
        const response = await axios.get('http://https://cld5-193-40-147-101.ngrok-free.app/glamping/filterByPrice', {
            params: { minPrice, maxPrice }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Server Error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network Error:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        throw error;
    }
};

export const deleteGlamping = async (id) => {
    try {
        const response =
            await axios.delete(`http://localhost:8080/glamping/${id}`);
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
