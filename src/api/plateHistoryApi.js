import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

export const searchPlateHistory = async (searchParams) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/plate_history/search`, { params: searchParams });
        return response.data;
    } catch (error) {
        console.error('API search failed:', error);
        throw error;  // Re-throw the error to be handled by the calling component.
    }
};
