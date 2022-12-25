import React, { useState } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Popup from '../popup/Popup';
import { deleteEvent } from '../../gateway/gateway';

import './calendar.scss';

const Calendar = ({ weekDates, events, onGetEvents }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupOpenCoordinates, setPopupOpenCoordinates] = useState({});
  const [eventIdToDelete, setEventIdToDelete] = useState();

  const handleDeleteEvent = () => {
    deleteEvent(eventIdToDelete).then(() => onGetEvents());
    setIsPopupOpen(!isPopupOpen);
  };

  const handleOpenPopup = (e, eventId) => {
    setPopupOpenCoordinates({
      top: e.pageY,
      left: e.pageX,
    });
    setEventIdToDelete(eventId);
    setIsPopupOpen(!isPopupOpen);
  };
  console.log('calendar');

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            onOpenPopup={handleOpenPopup}
            weekDates={weekDates}
            events={events}
          />
        </div>
        {isPopupOpen && (
          <Popup
            popupOpenCoordinates={popupOpenCoordinates}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
      </div>
    </section>
  );
};

export default Calendar;
