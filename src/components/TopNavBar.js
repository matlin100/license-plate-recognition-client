import React, { useState } from 'react';
import AllowedPlates from './allowedPlates';
import './TopNavBar.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const TopNavBar = () => {
  const [showAllowedPlatesModal, setShowAllowedPlatesModal] = useState(false);

  const handleOpen = () => setShowAllowedPlatesModal(true);
  const handleClose = () => setShowAllowedPlatesModal(false);

  return (
    <div className="top-nav-bar">
      <button onClick={handleOpen}>Manage Allowed Plates</button>
      <Modal
        open={showAllowedPlatesModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">Allowed Plates</h2>
          <AllowedPlates />
          <button onClick={handleClose}>Close</button>
        </Box>
      </Modal>
    </div>
  );
};

export default TopNavBar;
