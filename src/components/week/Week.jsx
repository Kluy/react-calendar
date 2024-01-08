import React from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';

import './week.scss';

const Week = ({ weekDates, events, onGetEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(day => {
        const dayEnd = new Date(day.getTime()).setHours(day.getHours() + 24);

        const dayEvents = events.filter(event => {
          return event.dateFrom >= day && event.dateTo < dayEnd;
        });
        return (
          <Day onGetEvents={onGetEvents} key={day.getDate()} day={day} dayEvents={dayEvents} />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object),
  events: PropTypes.arrayOf(PropTypes.object),
  onGetEvents: PropTypes.func.isRequired,
};

Week.defaultProps = {
  events: [],
};

export default Week;
