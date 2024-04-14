import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Updated from Switch to Routes */}
          <Route path="/" element={<Dashboard />} /> {/* Updated Route syntax */}
          {/* Additional routes can be defined here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
