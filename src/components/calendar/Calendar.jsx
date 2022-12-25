import React from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import './calendar.scss';

const Calendar = ({ weekDates, events, onGetEvents }) => {
  console.log('calendar');

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            onGetEvents={onGetEvents}
            weekDates={weekDates}
            events={events}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
