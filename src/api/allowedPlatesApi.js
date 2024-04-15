// src/api/allowedPlatesApi.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/allowed_plates';

export const createPlate = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to create document:', error.response?.data || error.message);
        throw error;
    }
};

export const getPlates = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/read`, { params: query });
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve documents:', error.response?.data || error.message);
        throw error;
    }
};

// src/api/allowedPlatesApi.js

export const updatePlate = async (plateId, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update`, data, {
            params: { _id: plateId } // Assuming `id` is the identifier for the plate document
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update document:', error.response?.data || error.message);
        throw error;
    }
};


export const deletePlate = async (plateId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete`, {
            params: { _id: plateId } // Assuming `id` is the identifier for the plate document
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete document:', error.response?.data || error.message);
        throw error;
    }
};
