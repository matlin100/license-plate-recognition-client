import React, { useState } from 'react';
import AllowedPlates from './allowedPlates';
import UploadControl from './UploadControl'; // Import UploadControl
import './TopNavBar.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FaTimes } from 'react-icons/fa'

const TopNavBar = () => {
  const [isTopBarOpen, setIsTopBarOpen] = useState(false);
  const [showAllowedPlatesModal, setShowAllowedPlatesModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleTopBarOpen = () => {
    setIsTopBarOpen(!isTopBarOpen);
  };

  const handleOpenModal = (modalType) => {
    if (modalType === 'plates') {
      setShowAllowedPlatesModal(true);
    } else if (modalType === 'upload') {
      setShowUploadModal(true);
    }
  };

  const handleCloseModal = (modalType) => {
    if (modalType === 'plates') {
      setShowAllowedPlatesModal(false);
    } else if (modalType === 'upload') {
      setShowUploadModal(false);
    }
  };

  return (
    <div onClick={handleTopBarOpen} className={`top-nav-bar ${isTopBarOpen ? 'open' : ''}`}>
      {isTopBarOpen ? (
        <>
          <CloseIcon className="nav-icon" />
          <div className="linkes-buttons">
            <button className="nav-button" onClick={() => handleOpenModal('plates')}>
              Manage Allowed Plates
            </button>
            <button className="nav-button" onClick={() => handleOpenModal('upload')}>
              Upload Video
            </button>
          </div>
        </>
      ) : (
        <MenuIcon className="nav-icon" />
      )}

      <Modal
        open={showAllowedPlatesModal}
        onClose={() => handleCloseModal('plates')}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal-style">
          <h2 id="modal-title" className="modal-title">Allowed Plates</h2>
          <AllowedPlates />
          <button className="close-button" onClick={() => handleCloseModal('plates')}>
            <FaTimes />
          </button>
        </Box>
      </Modal>

      <Modal
        open={showUploadModal}
        onClose={() => handleCloseModal('upload')}
        aria-labelledby="upload-modal-title"
        aria-describedby="upload-modal-description"
      >
        <Box className="modal-style">
          <h2 id="upload-modal-title" className="modal-title">Upload Video</h2>
          <UploadControl />
          <button className="close-button" onClick={() => handleCloseModal('upload')}>
            <FaTimes />
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default TopNavBar;