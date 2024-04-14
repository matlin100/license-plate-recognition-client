import './TopNavBar.css';

// TopNavBar.js
import React from 'react';

const TopNavBar = ({ onOpenPlatesModal }) => {
  return (
    <div className="top-nav-bar">
      <button onClick={onOpenPlatesModal}>Manage Allowed Plates</button>
      {/* Example Link to another route 
      <Link to="/some-other-page">Some Other Page</Link>
       */}
    </div>
  );
};

export default TopNavBar;
