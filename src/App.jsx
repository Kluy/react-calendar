import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import moment from 'moment';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  
  const [weekStartDate, setWeekStartDate] = useState(new Date())
  
  const handleWeekNext = () => {
    setWeekStartDate(new Date(weekStartDate));
  }
  const handleWeekPrevious = () => {}
  
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  return (
    <>
      <Header addWeek={handleWeekNext} />
      <Calendar weekDates={weekDates} />
    </>
  );
}

export default App;
