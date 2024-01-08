import React, { useState } from 'react';
import Hour from '../hour/Hour';
import Popup from '../popup/Popup';
import PropTypes from 'prop-types';
import { deleteEvent } from '/src/gateway/gateway';

import './day.scss';

const Day = ({ day, dayEvents, onGetEvents }) => {
  const dayNumber = day.getDate();
  const currentDate = new Date();
  const isDayCurrent =
    dayNumber === currentDate.getDate() && day.getMonth() === currentDate.getMonth();
  const currentHours = currentDate.getHours();

  const [top, setTop] = useState(currentHours * 60 - currentHours + currentDate.getMinutes());

  if (isDayCurrent) {
    setTimeout(() => setTop(top + 1), 60000);
  }

  const hours = Array(24)
    .fill()
    .map((_, index) => index);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCoordinates, setPopupCoordinates] = useState({});
  const [eventIdToDelete, setEventIdToDelete] = useState();

  const handleDeleteEvent = () => {
    deleteEvent(eventIdToDelete).then(() => onGetEvents());
    setIsPopupOpen(false);
  };

  const handleOpenPopup = (e, eventId) => {
    setPopupCoordinates({
      top: e.pageY,
      left: e.pageX,
    });
    setEventIdToDelete(eventId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="calendar__day" data-day={dayNumber}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);
        return (
          <Hour
            onOpenPopup={handleOpenPopup}
            key={dayNumber + hour}
            dataHour={hour}
            hourEvents={hourEvents}
          />
        );
      })}
      {isPopupOpen && (
        <Popup
          onClosePopup={closePopup}
          onGetEvents={onGetEvents}
          popupCoordinates={popupCoordinates}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      {isDayCurrent && <div style={{ top }} className="line"></div>}
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  dayEvents: PropTypes.arrayOf(PropTypes.object),
  onGetEvents: PropTypes.func.isRequired,
};

Day.defaultProps = {
  dayEvents: [],
};

export default Day;
