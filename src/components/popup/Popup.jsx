import React from 'react';
import PropTypes from 'prop-types';
import './popup.scss';

const Popup = ({ popupCoordinates, onDeleteEvent, onClosePopup }) => {
  return (
    <div onClick={onClosePopup} className="modal overlay">
      <button style={popupCoordinates} onClick={onDeleteEvent} className="button delete-event-btn">
        <i className="fa-sharp fa-solid fa-trash" /> Delete
      </button>
    </div>
  );
};

Popup.propTypes = {
  popupCoordinates: PropTypes.objectOf(PropTypes.number).isRequired,
  onDeleteEvent: PropTypes.func.isRequired,
  onClosePopup: PropTypes.func.isRequired,
};

export default Popup;
