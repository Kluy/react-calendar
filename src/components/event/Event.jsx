import React from 'react';

import './event.scss';

const Event = ({ height, marginTop, title, time, onOpenPopup, eventId }) => {
  console.log('event');

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

export default Event;
