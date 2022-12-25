import React from 'react';
import './popup.scss';

const Popup = ({ popupOpenCoordinates, onDeleteEvent, onClosePopup }) => {
  return (
    <div onClick={onClosePopup} className="modal overlay">
      <button
        style={popupOpenCoordinates}
        onClick={onDeleteEvent}
        className="button delete-event-btn"
      >
        <i className="fa-sharp fa-solid fa-trash"></i> Delete
      </button>
    </div>
  );
};

export default Popup;
