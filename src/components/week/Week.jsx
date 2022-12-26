import React from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';

import './week.scss';

const Week = ({ weekDates, events, onGetEvents }) => {
  console.log('week');

  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter((event) => {
          return event.dateFrom > dayStart && event.dateTo < dayEnd;
        });
        return (
          <Day
            onGetEvents={onGetEvents}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
          />
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

export default Week;
