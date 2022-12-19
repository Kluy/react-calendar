import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import moment from 'moment';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleSetEventData = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleAddWeek = () => {
    setWeekStartDate(new Date(moment(weekStartDate).add(7, 'days')));
  };
  const handleSubtractWeek = () => {
    setWeekStartDate(new Date(moment(weekStartDate).subtract(7, 'days')));
  };

  const handleSetCurrentWeek = () => {
    setWeekStartDate(new Date());
  };

  const handleIsModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const currentMonthName =
    weekDates[0].getDate() < weekDates[6].getDate()
      ? moment(weekDates[0]).format('MMM')
      : moment(weekDates[0]).format('MMM') +
        ' - ' +
        moment(weekDates[6]).format('MMM');

  return (
    <>
      <Header
        currentMonthName={currentMonthName}
        onIsModalOpen={handleIsModalOpen}
        onSetCurrentWeek={handleSetCurrentWeek}
        onAddWeek={handleAddWeek}
        onSubtractWeek={handleSubtractWeek}
      />
      <Calendar weekDates={weekDates} />
      {isModalOpen ? (
        <Modal
          eventData={eventData}
          onSetEventData={handleSetEventData}
          onIsModalOpen={handleIsModalOpen}
        />
      ) : null}
    </>
  );
};

export default App;
