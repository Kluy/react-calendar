import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import Modal from './components/modal/Modal.jsx';
import moment from 'moment';
import { postEvent } from './gateway/gateway.js';

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

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const dateFrom = new Date(`${eventData.date}T${eventData.startTime}`);
    const dateTo = new Date(`${eventData.date}T${eventData.endTime}`);
    const { title, description } = eventData;
    postEvent({
      title,
      description,
      dateFrom,
      dateTo,
    });
    setIsModalOpen(!isModalOpen);
  };

  const handleSetEventData = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
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
          onCreateEvent={handleCreateEvent}
          eventData={eventData}
          onSetEventData={handleSetEventData}
          onIsModalOpen={handleIsModalOpen}
        />
      ) : null}
    </>
  );
};

export default App;
