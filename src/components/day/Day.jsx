import React, { useState } from 'react';
import Hour from '../hour/Hour';
import Popup from '../popup/Popup';
import PropTypes from 'prop-types';
import { deleteEvent } from '../../gateway/gateway';

import './day.scss';

const Day = ({ dataDay, dayEvents, onGetEvents }) => {
  const currentDay = dataDay === new Date().getDate();
  const currentHours = new Date().getHours();
  const [top, setTop] = useState(
    currentHours * 60 - currentHours + new Date().getMinutes()
  );

  if (currentDay) {
    setTimeout(() => setTop(top + 1), 60000);
  }

  const hours = Array(24)
    .fill()
    .map((val, index) => index);

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
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );
        return (
          <Hour
            onOpenPopup={handleOpenPopup}
            key={dataDay + hour}
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
      {currentDay && <div style={{ top }} className="line"></div>}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.arrayOf(PropTypes.object),
  onGetEvents: PropTypes.func.isRequired,
};

Day.defaultProps = {
  dayEvents: [],
};

export default Day;
