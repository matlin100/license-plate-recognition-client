import React from 'react';

const LicensePlateDisplay = ({ licensePlate, plateImage }) => {
  return (
    <div>
     <p>Detected License Plate: {licensePlate}</p>
    
        <div>
          <h2>Detected Plate Image:</h2>
          <img src={plateImage} alt="Detected License Plate" style={{ width: '300px' }} />
        </div>
    
    </div>
  );
};

export default LicensePlateDisplay;
