import React, { useState } from 'react';
import Hour from '../hour/Hour';
import Popup from '../popup/Popup';
import PropTypes from 'prop-types';
import { deleteEvent } from '../../gateway/gateway';

import './day.scss';

const Day = ({ dataDay, dayEvents, onGetEventId, onGetEvents }) => {
  const currentHours = new Date().getHours();
  const [top, setTop] = useState(
    currentHours * 60 - currentHours + new Date().getMinutes()
  );
  if (dataDay === new Date().getDate()) {
    setTimeout(() => setTop(top + 1), 60000);
  }

  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  console.log('day');

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCoordinates, setPopupCoordinates] = useState({});
  const [eventIdToDelete, setEventIdToDelete] = useState();

  const handleDeleteEvent = () => {
    deleteEvent(eventIdToDelete).then(() => onGetEvents());
    setIsPopupOpen(false);
  };

  const handleOpenPopup = (e, eventId) => {
    console.log(e);
    console.log(e.pageY);
    console.log(e.pageX);
    setPopupCoordinates({
      top: e.pageY,
      left: e.pageX,
    });
    setEventIdToDelete(eventId);
    setIsPopupOpen(!isPopupOpen);
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
            onGetEventId={onGetEventId}
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
      {dataDay === new Date().getDate() && (
        <div style={{ top }} className="line"></div>
      )}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.arrayOf(PropTypes.object),
  onGetEventId: PropTypes.func.isRequired,
  onGetEvents: PropTypes.func.isRequired,
};

Day.defaultProps = {
  dayEvents: [],
};

export default Day;
