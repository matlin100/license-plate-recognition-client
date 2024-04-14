import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import VideoFeed from './VideoFeed';
import LicensePlateDisplay from './LicensePlateDisplay';
import AllowedPlates from './allowedPlates';
import PlateHistory from './PlateHistory';
import './Dashboard.css';

const Dashboard = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [plateImage, setPlateImage] = useState(null);
  const [showGreenFrame, setShowGreenFrame] = useState(false);

  const socket = io('http://localhost:5001');

  useEffect(() => {
    socket.on('license_plate_detected', (data) => {
      setLicensePlate(data.license_plate);
      setShowGreenFrame(true);
      setTimeout(() => setShowGreenFrame(false), 10000);
    });

    socket.on('plate_image', (data) => {
      setPlateImage(data.data);
    });

    return () => {
      socket.off('license_plate_detected');
      socket.off('plate_image');
    };
  }, [socket]);
  return (
    <div className="dashboard-container" style={{
      gridTemplateColumns: showGreenFrame ? '70% 30%' : '1fr'
    }}>
      <div className="video-feed-container" style={{
        gridColumn: showGreenFrame ? '1' : '1 / -1' // If showGreenFrame is false, span full width
      }}>
        <VideoFeed licenseDetected={showGreenFrame} />
      </div>

      {showGreenFrame && (
        <div className="license-plate-display-container">
          <LicensePlateDisplay licensePlate={licensePlate} plateImage={plateImage} />
        </div>
      )}

      <div className="bottom-section">
        <AllowedPlates />
        <PlateHistory />
      </div>
    </div>
  );
};

export default Dashboard;
