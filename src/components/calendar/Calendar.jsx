import React, { useState, useEffect } from 'react';
import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import Modal from '../modal/Modal';
import { getWeekStartDate, generateWeekRange } from '/src/utils/dateUtils.js';
import { fetchData } from '/src/gateway/gateway.js';

import './calendar.scss';

const Calendar = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const handleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getEvents = () => {
    fetchData().then(result => {
      setEvents(
        result.map(event => {
          return {
            ...event,
            dateFrom: new Date(event.dateFrom),
            dateTo: new Date(event.dateTo),
          };
        }),
      );
    });
  };

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header
        weekDates={weekDates}
        onIsModalOpen={handleIsModalOpen}
        onSetWeekStartDate={setWeekStartDate}
        weekStartDate={weekStartDate}
      />
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week onGetEvents={getEvents} weekDates={weekDates} events={events} />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <Modal onGetEvents={getEvents} events={events} onIsModalOpen={handleIsModalOpen} />
      )}
    </>
  );
};

export default Calendar;
