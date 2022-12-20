import React from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
// import events from '../../gateway/events';
import { useState, useEffect } from 'react';
import { fetchData } from '../../gateway/gateway';

import './calendar.scss';

const Calendar = ({ weekDates }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // fetchData().then((result) => {
    //   console.log(result), setEvents(result);
    // });
  }, []);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={events} />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
