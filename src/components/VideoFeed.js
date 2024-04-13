import React from 'react';
import './VideoFeed.css'; // Import the CSS file
const VideoFeed = ({ frame, isCapturing, licenseDetected }) => {
  // Define a style object based on licenseDetected
  const imageStyle = licenseDetected
    ? { width: '80%', border: '5px solid green' } // If a license is detected, add a green border
    : { width: '80%' };

  return (
    <div>
      <h2>Video Feed Component</h2>
      {isCapturing ? (
        <div className='frame'>
            <img src={frame} alt="Video Feed" style={imageStyle} />
        </div>
      ) : (
        <p>Video feed is not available.</p>
      )}
    </div>
  );
};

export default VideoFeed;
