import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './header.scss';

const Header = ({ onIsModalOpen, onSetWeekStartDate, weekStartDate, weekDates }) => {
  const currentMonthName =
    weekDates[0].getDate() < weekDates[6].getDate()
      ? moment(weekDates[0]).format('MMM')
      : moment(weekDates[0]).format('MMM') + ' - ' + moment(weekDates[6]).format('MMM');

  const changeWeek = e => {
    const week = e.target.dataset.week;

    if (week === 'previous') {
      onSetWeekStartDate(new Date(moment(weekStartDate).subtract(7, 'days')));
    } else if (week === 'next') {
      onSetWeekStartDate(new Date(moment(weekStartDate).add(7, 'days')));
    } else {
      onSetWeekStartDate(new Date());
    }
  };

  return (
    <header className="header">
      <button onClick={onIsModalOpen} className="button create-event-btn">
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          data-week="current"
          onClick={e => changeWeek(e)}
          className="navigation__today-btn button"
        >
          Today
        </button>
        <button
          data-week="previous"
          onClick={e => changeWeek(e)}
          className="icon-button navigation__nav-icon"
        >
          <i data-week="previous" className="fas fa-chevron-left"></i>
        </button>
        <button
          data-week="next"
          onClick={e => changeWeek(e)}
          className="icon-button navigation__nav-icon"
        >
          <i data-week="next" className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-months">{currentMonthName}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  onIsModalOpen: PropTypes.func.isRequired,
  onSetWeekStartDate: PropTypes.func.isRequired,
  weekDates: PropTypes.arrayOf(PropTypes.object).isRequired,
  weekStartDate: PropTypes.instanceOf(Date),
};

Header.defaultProps = {
  weekStartDate: new Date(),
};

export default Header;
