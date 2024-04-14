import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LicensePlateProvider } from './context/LicensePlateContext'; // Ensure this path is correct
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <LicensePlateProvider> {/* Wrap Router in LicensePlateProvider */}
            <Router>
                <div className="App">
                    <Routes> {/* Updated from Switch to Routes */}
                        <Route path="/" element={<Dashboard />} /> {/* Updated Route syntax */}
                        {/* Additional routes can be defined here */}
                    </Routes>
                </div>
            </Router>
        </LicensePlateProvider>
    );
}

export default App;
