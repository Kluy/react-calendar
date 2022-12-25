import React, { useState } from 'react';
import Hour from '../hour/Hour';
import Popup from '../popup/Popup';
import { deleteEvent } from '../../gateway/gateway';

import './day.scss';

const Day = ({ dataDay, dayEvents, onGetEventId, onGetEvents }) => {
  const currentHours = new Date().getHours();
  const [top, setTop] = useState(
    currentHours * 60 - currentHours + new Date().getMinutes()
  );

  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  if (dataDay === new Date().getDate()) {
    setTimeout(() => setTop(top + 1), 60000);
  }
  console.log('day');

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupOpenCoordinates, setPopupOpenCoordinates] = useState({});
  const [eventIdToDelete, setEventIdToDelete] = useState();

  const handleDeleteEvent = () => {
    deleteEvent(eventIdToDelete).then(() => onGetEvents());
    setIsPopupOpen(false);
  };

  const handleOpenPopup = (e, eventId) => {
    console.log(e);
    setPopupOpenCoordinates({
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
          popupOpenCoordinates={popupOpenCoordinates}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      {dataDay === new Date().getDate() && (
        <div style={{ top }} className="line"></div>
      )}
    </div>
  );
};

export default Day;
