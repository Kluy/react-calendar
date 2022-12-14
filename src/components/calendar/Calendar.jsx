import React from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import PropTypes from 'prop-types';

import './calendar.scss';

const Calendar = ({ weekDates, events, onGetEvents }) => {
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            onGetEvents={onGetEvents}
            weekDates={weekDates}
            events={events}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.object),
  events: PropTypes.array,
  onGetEvents: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  events: [],
  weekDates: [],
};

export default Calendar;
