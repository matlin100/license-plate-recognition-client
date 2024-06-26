import React, { createContext, useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';

const LicensePlateContext = createContext();

export const useLicensePlate = () => useContext(LicensePlateContext);

export const LicensePlateProvider = ({ children }) => {
    const [licensePlate, setLicensePlate] = useState('');
    const [plateImage, setPlateImage] = useState(null);
    const [showGreenFrame, setShowGreenFrame] = useState(false);
    const [frame, setFrame] = useState(null);  // New state for video frames
    const [frameStopped, setFrameStopped] = useState(false); // State to track frame stop

    // Create socket connection
    const socket = io('http://localhost:5001');

    useEffect(() => {
        // Handling license plate detection
        socket.on('license_plate_detected', (data) => {
            setLicensePlate(data.license_plate);
            setShowGreenFrame(true);
            setTimeout(() => setShowGreenFrame(false), 10000);
        });

        // Handling new plate image
        socket.on('plate_image', (data) => {
            setPlateImage(data.data);
        });

        // Handling video frame updates
        socket.on('frame', (data) => {
            setFrame(data.data);
            setFrameStopped(false); // Reset frame stopped flag
        });

        // Handling frame stop signal
        socket.on('frame_stopped', () => {
            setFrame(null); // Set frame to null
            setFrameStopped(true); // Set frame stopped flag
        });

        // Cleanup on unmount
        return () => {
            socket.off('license_plate_detected');
            socket.off('plate_image');
            socket.off('frame');
            socket.off('frame_stopped');
        };
    }, [socket]);

    return (
        <LicensePlateContext.Provider value={{
            licensePlate, setLicensePlate,
            plateImage, setPlateImage,
            showGreenFrame, setShowGreenFrame,
            frame, setFrame,
            frameStopped, setFrameStopped,
            socket
        }}>
            {children}
        </LicensePlateContext.Provider>
    );
};
