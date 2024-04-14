import React, { useState } from 'react';
import { startVideo, stopVideo } from '../api/videoAPI';
import { Box, CircularProgress, Button } from '@mui/material';
import './VideoFeed.css';
import { useLicensePlate } from '../context/LicensePlateContext'; // Make sure this path is correct
import LicensePlateDisplay from './LicensePlateDisplay'; // Import if you're using it within this component

const VideoFeed = () => {
  const { frame, showGreenFrame } = useLicensePlate();
  const [isCapturing, setIsCapturing] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  const handleStartVideo = async () => {
    setIsCapturing(true);
    try {
      await startVideo();
    } catch (error) {
      console.error('Failed to start video capture:', error);
      setIsCapturing(false);
    }
  };

  const handleStopVideo = async () => {
    setIsStopping(true);
    try {
      await stopVideo();
      setIsCapturing(false);
    } catch (error) {
      console.error('Failed to stop video capture:', error);
    } finally {
      setIsStopping(false);
    }
  };

  return (
    <Box className='component' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Video Feed Component</h2>
        {isCapturing ? (
            frame ? (
              <>
                <img src={frame} alt="Video Feed" style={{ width: '100%', border: showGreenFrame ? '5px solid green' : '5px solid blue' }} />
                {showGreenFrame && ( <LicensePlateDisplay  />)}
              </>
            ) : (
                <CircularProgress />
            )
        ) : (
            <p>Video feed is not available.</p>
        )}
        {isCapturing ? (
            isStopping ? (
                <Button variant="contained" disabled>Stopping...</Button>
            ) : (
                <Button onClick={handleStopVideo} variant="contained" color="error">Stop Video</Button>
            )
        ) : (
            <Button onClick={handleStartVideo} variant="contained" color="primary">Start Video</Button>
        )}
    </Box>
  );
};

export default VideoFeed;
