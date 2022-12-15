import React from 'react';
import classNames from 'classnames';

import { days } from '../../utils/dateUtils.js';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  const currentDay = new Date().getDate();

  return (
    <header className="calendar__header">
      {weekDates.map((date) => (
        <div className="calendar__day-label day-label">
          <span className='day-label__day-name' >{days[date.getDay()]}</span>
          <span className={classNames('day-label__day-number', {'day-label__current-day': currentDay === date.getDate()})}>{date.getDate()}</span>
        </div>
      ))}
    </header>
  );
};

export default Navigation;
