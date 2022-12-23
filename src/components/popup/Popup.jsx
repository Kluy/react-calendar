import React from 'react';
import './popup.scss';

const Popup = ({ popupOpenCoordinates, onDeleteEvent }) => {
  return (
    <button
      style={popupOpenCoordinates}
      onClick={onDeleteEvent}
      className="button delete-event-btn"
    >
      <i className="fa-sharp fa-solid fa-trash"></i> Delete
    </button>
  );
};

export default Popup;
