import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { days } from '../../utils/dateUtils.js';

import './navigation.scss';

const Navigation = ({ weekDates }) => {
  const currentDay = new Date().getDate();

  return (
    <header className="calendar__header">
      {weekDates.map((date) => (
        <div key={date} className="calendar__day-label day-label">
          <span
            className={classNames('day-label__day-name', {
              'day-label__day-name_current': currentDay === date.getDate(),
            })}
          >
            {days[date.getDay()]}
          </span>
          <span
            className={classNames('day-label__day-number', {
              'day-label__day-number_current': currentDay === date.getDate(),
            })}
          >
            {date.getDate()}
          </span>
        </div>
      ))}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
