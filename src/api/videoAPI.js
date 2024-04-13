// src/api/videoAPI.js

const API_BASE_URL = 'http://localhost:5001';

export const startVideo = async () => {
    console.log('in start video')
  try {
    const response = await fetch(`${API_BASE_URL}/start_video`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to start video');
    }
    return await response.text();
  } catch (error) {
    console.error('Error starting video:', error);
    throw error;
  }
};

export const stopVideo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stop_video`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to stop video');
    }
    return await response.text();
  } catch (error) {
    console.error('Error stopping video:', error);
    throw error;
  }
};