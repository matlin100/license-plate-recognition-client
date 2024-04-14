import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { startVideo, stopVideo } from '../api/videoAPI';
import { Box, CircularProgress, Button } from '@mui/material';
import './VideoFeed.css';

const VideoFeed = ({ licenseDetected }) => {
  const [frame, setFrame] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isStopping, setIsStopping] = useState(false);  // New state to indicate stopping process
  const socket = io('http://localhost:5001');

  useEffect(() => {
    socket.on('frame', (data) => {
      setFrame(data.data);
    });

    return () => {
      socket.off('frame');
    };
  }, [socket]);

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
    setIsStopping(true);  // Indicate stopping process has started
    try {
      await stopVideo();
      setFrame(null);
      setIsCapturing(false);
    } catch (error) {
      console.error('Failed to stop video capture:', error);
    } finally {
      setIsStopping(false);  // Reset stopping indicator
    }
  };

  return (
    <Box className='component' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Video Feed Component</h2>
      {isCapturing ? (
        frame ? (
          <img src={frame} alt="Video Feed" style={{ width: '100%', border: licenseDetected ? '5px solid green' : '5px solid blue' }} />
        ) : (
          <CircularProgress />
        )
      ) : (
        <p>Video feed is not available.</p>
      )}
      {isCapturing ? (
        isStopping ? (
          <Button variant="contained" disabled>Stopping...</Button>  // Disable the button and show "Stopping..."
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
