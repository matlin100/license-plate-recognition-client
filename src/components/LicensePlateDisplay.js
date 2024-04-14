import React, { useState, useEffect } from 'react';
import { useLicensePlate } from '../context/LicensePlateContext'; // Make sure the path to the context is correct

const LicensePlateDisplay = () => {
  const { licensePlate, plateImage } = useLicensePlate(); // Access state from context
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    if (licensePlate || plateImage) {
      const currentTimestamp = new Date().toLocaleString(); // Capture the current date and time
      setTimestamp(currentTimestamp);
    }
  }, [licensePlate, plateImage]); // Dependency array includes licensePlate and plateImage to update the timestamp when these props change

  return (
    <div>
      <p>Detected License Plate: {licensePlate}</p>
      {timestamp && <p>Detected Time: {timestamp}</p>}
      {plateImage && (
        <div>
          <h2>Detected Plate Image:</h2>
          <img src={plateImage} alt="Detected License Plate" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default LicensePlateDisplay;
