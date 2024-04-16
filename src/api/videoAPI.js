// src/api/videoAPI.js

const API_BASE_URL = 'http://localhost:5001';

export const startVideo = async () => {
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

export const uploadFile = async (formData) => {
    try {
      let url = `${API_BASE_URL}/start_video`;
      let options = {
        method: 'POST',
        body: null,
      };
  
      if (formData instanceof File) {
        // If the formData is a file, send it as a file
        const data = new FormData();
        data.append('video_file', formData);
        options.body = data;
      } else if (formData.video_path) {
        // If the formData is an object with a video_path property, send it as query parameters
        url = `${API_BASE_URL}/start_video?video_path=${formData.video_path}`;
      } else if (formData.camera_index !== undefined) {
        // If the formData is an object with a camera_index property, send it as query parameters
        url = `${API_BASE_URL}/start_video?camera_index=${formData.camera_index}`;
      } else {
        throw new Error('Invalid formData format');
      }
  
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'File upload failed');
      }
      return await response.json(); // Assuming the server responds with JSON
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Rethrow to handle it in the component
    }
  };
  