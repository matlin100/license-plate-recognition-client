import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import VideoFeed from './VideoFeed';
import { startVideo, stopVideo } from '../api/videoAPI';
import LicensePlateDisplay from './LicensePlateDisplay'; // Import the new component

const Dashboard = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [plateImage, setPlateImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [frame, setFrame] = useState(null);
  const [showGreenFrame, setShowGreenFrame] = useState(false);
  const [showVideoFeed, setShowVideoFeed] = useState(true);

  const socket = io('http://localhost:5001');

  useEffect(() => {
    const onLicensePlateDetected = (data) => {
      setLicensePlate(data.license_plate);
      setShowGreenFrame(true);
      setShowVideoFeed(false);  // Hide VideoFeed when a plate is detected
      setTimeout(() => setShowGreenFrame(false), 10000);
    };

    const onFrame = (data) => {
      setFrame(data.data);
      setShowVideoFeed(true);  // Show VideoFeed when frames are being received
    };

    const onPlateImage = (data) => {
      setPlateImage(data.data);
      setShowVideoFeed(false);  // Hide VideoFeed when plate image is received
    };

    socket.on('license_plate_detected', onLicensePlateDetected);
    socket.on('frame', onFrame);
    socket.on('plate_image', onPlateImage);

    return () => {
      socket.off('license_plate_detected', onLicensePlateDetected);
      socket.off('frame', onFrame);
      socket.off('plate_image', onPlateImage);
    };
  }, [socket]);

  const handleStartVideo = async () => {
    setIsCapturing(true);
    await startVideo().catch(error => {
      console.error('Failed to start video capture:', error);
      setIsCapturing(false);
    });
  };

  const handleStopVideo = async () => {
    setIsCapturing(false);
    await stopVideo().catch(error => {
      console.error('Failed to stop video capture:', error);
    });
  };

  return (
    <div>
      <h1>License Plate Recognition Dashboard</h1>

      {showVideoFeed && (
        <VideoFeed frame={frame} isCapturing={isCapturing} licenseDetected={showGreenFrame} />
      )}

      { showGreenFrame && (
        <LicensePlateDisplay licensePlate={licensePlate} plateImage={plateImage} />
      )}

      {isCapturing ? (
        <button onClick={handleStopVideo}>Stop Video</button>
      ) : (
        <button onClick={handleStartVideo}>Start Video</button>
      )}
    </div>
  );
};

export default Dashboard;
