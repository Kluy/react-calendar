import React from 'react';
import PropTypes from 'prop-types';
import './event.scss';

const Event = ({ height, marginTop, title, time, eventId, onOpenPopup }) => {
  return (
    <>
      <div
        onClick={(e) => onOpenPopup(e, eventId)}
        style={{ height, marginTop }}
        className="event"
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
    </>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  eventId: PropTypes.string.isRequired,
  title: PropTypes.string,
  time: PropTypes.string,
  onOpenPopup: PropTypes.func.isRequired,
};

Event.defaultProps = {
  title: 'Title unavailable',
  time: 'Time unavailable',
};

export default Event;
