// src/api/platesApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/allowed_plates';

// Function to create a document
export const createPlate = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to create document:', error);
        throw error;
    }
};

// Function to read documents
export const getPlates = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/read`, { params: query });
        return response.data;
    } catch (error) {
        console.error('Failed to retrieve documents:', error);
        throw error;
    }
};

// Function to update a document
export const updatePlate = async (query, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update`, data, { params: query });
        return response.data;
    } catch (error) {
        console.error('Failed to update document:', error);
        throw error;
    }
};

// Function to delete a document
export const deletePlate = async (query) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete`, { params: query });
        return response.data;
    } catch (error) {
        console.error('Failed to delete document:', error);
        throw error;
    }
};
