import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { days } from '/src/utils/dateUtils.js';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map(date => {
        const isDateCurrent =
          new Date().getMonth() === date.getMonth() && new Date().getDate() === date.getDate();
        return (
          <div key={date} className="calendar__day-label day-label">
            <span
              className={classNames('day-label__day-name', {
                'day-label__day-name_current': isDateCurrent,
              })}
            >
              {days[date.getDay()]}
            </span>
            <span
              className={classNames('day-label__day-number', {
                'day-label__day-number_current': isDateCurrent,
              })}
            >
              {date.getDate()}
            </span>
          </div>
        );
      })}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
