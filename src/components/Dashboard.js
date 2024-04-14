import React from 'react';
import VideoFeed from './VideoFeed';
import PlateHistory from './PlateHistory';
import TopNavBar from './TopNavBar';
import './Dashboard.css';


const Dashboard = () => {
    // Use the custom hook to access the context values
  
    return (
        <div className="dashboard-container">
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
