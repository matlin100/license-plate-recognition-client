// UploadControl.js

import React, { useState } from 'react';
import { uploadFile } from '../api/videoAPI'; // Ensure this path is correct

const UploadControl = () => {
    const [file, setFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await uploadFile(formData);
            setUploadResponse(response.message); // Handle the response. Example: { message: "File uploaded successfully!" }
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed, check console for details.');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload File</button>
            {uploadResponse && <p>{uploadResponse}</p>}
        </div>
    );
};

export default UploadControl;
