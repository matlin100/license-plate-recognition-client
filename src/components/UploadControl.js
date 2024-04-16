import React, { useState } from 'react';
import { uploadFile } from '../api/videoAPI';

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
        setCameraIndex(event.target.value);
    };

    const handleUpload = async () => {
        let formData = null;
        if (file) {
            formData = file;
        } else if (videoPath) {
            formData = { video_path: videoPath };
        } else if (cameraIndex !== 0) {
            formData = { camera_index: cameraIndex };
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
        <div>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Video Path" value={videoPath} onChange={handleVideoPathChange} />
            <input type="number" placeholder="Camera Index" value={cameraIndex} onChange={handleCameraIndexChange} />
            <button onClick={handleUpload}>Upload File</button>
            {uploadResponse && <p>{uploadResponse}</p>}
        </div>
    );
};

export default UploadControl;