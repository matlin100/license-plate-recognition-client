import React from 'react';
import VideoFeed from './VideoFeed';
import PlateHistory from './PlateHistory';
import TopNavBar from './TopNavBar';
import LicensePlateDisplay from './LicensePlateDisplay' 
import './Dashboard.css';
import { useLicensePlate } from '../context/LicensePlateContext';


const Dashboard = () => {
    // Use the custom hook to access the context values
    const {showGreenFrame } = useLicensePlate();
    return (
        <div className="dashboard-container">
                {true && (
                    <div className="license-plate-display-container">
                        <LicensePlateDisplay />
                    </div>
                )}
            <div className="topnavbar">
                <TopNavBar />
            </div>
            <div className="video-feed-container">
                <VideoFeed />
            </div>
            <div className="history-container">
                <PlateHistory />
            </div>
           
        </div>
    );
};

export default Dashboard;
