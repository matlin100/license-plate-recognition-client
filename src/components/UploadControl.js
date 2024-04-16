import React, { useState } from 'react';
import { uploadFile } from '../api/videoAPI';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UploadControl = () => {
    const [file, setFile] = useState(null);
    const [videoPath, setVideoPath] = useState('');
    const [cameraIndex, setCameraIndex] = useState(0);
    const [uploadResponse, setUploadResponse] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleVideoPathChange = (event) => {
        setVideoPath(event.target.value);
    };

    const handleCameraIndexChange = (event) => {
        setCameraIndex(parseInt(event.target.value, 10)); // Ensure the value is an integer
    };

    const handleUpload = async () => {
        let formData = new FormData();
        if (file) {
            formData.append('file', file);
        } else if (videoPath) {
            formData.append('video_path', videoPath);
        } else if (cameraIndex !== 0) {
            formData.append('camera_index', cameraIndex);
        } else {
            alert('Please select a file, provide a video path, or choose a camera index!');
            return;
        }

        try {
            const response = await uploadFile(formData);
            setUploadResponse(response.message);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed, check console for details.');
        }
    };

    return (
        <div className="container mt-3">
            <input type="file" className="form-control mb-3" onChange={handleFileChange} />
            <input type="text" className="form-control mb-3" placeholder="Video Path" value={videoPath} onChange={handleVideoPathChange} />
            <input type="number" className="form-control mb-3" placeholder="Camera Index" value={cameraIndex} onChange={handleCameraIndexChange} />
            <button className="btn btn-primary" onClick={handleUpload}>Upload File</button>
            {uploadResponse && <p className="alert alert-success mt-3">{uploadResponse}</p>}
        </div>
    );
};

export default UploadControl;
