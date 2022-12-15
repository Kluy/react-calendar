import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import moment from 'moment';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  
  const [weekStartDate, setWeekStartDate] = useState(new Date())
  
  const handleWeekNext = () => {
    setWeekStartDate(new Date(moment(weekStartDate).add(7, 'days')));
  }
  const handleWeekPrevious = () => {
    setWeekStartDate(new Date(moment(weekStartDate).subtract(7, 'days')));
  }
  
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  return (
    <>
      <Header addWeek={handleWeekNext} subtractWeek={handleWeekPrevious} />
      <Calendar weekDates={weekDates} />
    </>
  );
}

export default App;
