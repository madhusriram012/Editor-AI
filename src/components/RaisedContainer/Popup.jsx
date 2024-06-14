import React from 'react';
import '../RaisedContainer/Popup.css';

const Popup = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Popup Content</h2>
        <p>This is the content of the popup.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;