import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import moment from 'moment';
import { fetchData } from './gateway/gateway.js';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    getEvents();
  }, []);

  const handleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSetCurrentWeek = () => {
    setWeekStartDate(new Date());
  };

  const handleAddWeek = () => {
    setWeekStartDate(new Date(moment(weekStartDate).add(7, 'days')));
  };
  const handleSubtractWeek = () => {
    setWeekStartDate(new Date(moment(weekStartDate).subtract(7, 'days')));
  };

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const currentMonthName =
    weekDates[0].getDate() < weekDates[6].getDate()
      ? moment(weekDates[0]).format('MMM')
      : moment(weekDates[0]).format('MMM') + ' - ' + moment(weekDates[6]).format('MMM');

  return (
    <>
      <Header
        currentMonthName={currentMonthName}
        onIsModalOpen={handleIsModalOpen}
        onSetCurrentWeek={handleSetCurrentWeek}
        onAddWeek={handleAddWeek}
        onSubtractWeek={handleSubtractWeek}
      />
      <Calendar onGetEvents={getEvents} events={events} weekDates={weekDates} />
      {isModalOpen ? <Modal events={events} onIsModalOpen={handleIsModalOpen} /> : null}
    </>
  );
};

export default App;
