import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import moment from 'moment';
import { months } from './utils/dateUtils.js';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  
  const [weekStartDate, setWeekStartDate] = useState(new Date())
  
  const handleAddWeek = () => {
    setWeekStartDate(new Date(moment(weekStartDate).add(7, 'days')));
  }
  const handleSubtractWeek = () => {
    setWeekStartDate(new Date(moment(weekStartDate).subtract(7, 'days')));
  }

  const handleSetCurrentWeek = () => {
    setWeekStartDate(new Date());
  }
  
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  const currentMonths = weekDates[0].getDate() < weekDates[6].getDate() ? moment(weekDates[0]).format('MMM') : moment(weekDates[0]).format('MMM') + '-' + moment(weekDates[6]).format('MMM')

  return (
    <>
      <Header currentMonths={currentMonths} onSetCurrentWeek={handleSetCurrentWeek} onAddWeek={handleAddWeek} onSubtractWeek={handleSubtractWeek} />
      <Calendar weekDates={weekDates} />
    </>
  );
}

export default App;
