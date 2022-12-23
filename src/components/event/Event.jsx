import React from 'react';

import './event.scss';

const Event = ({
  height,
  marginTop,
  title,
  time,
  description,
  onOpenPopup,
  eventId,
}) => {
  return (
    <>
      <div
        onClick={(e) => onOpenPopup(e, eventId)}
        style={{ height, marginTop }}
        className="event"
      >
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        <div className="">{description}</div>
      </div>
    </>
  );
};

export default Event;
