import React from 'react';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import { formatMins } from '/src/utils/dateUtils';

const Hour = ({ dataHour, hourEvents, onOpenPopup }) => {
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;
        formatMins;
        return (
          <Event
            onOpenPopup={onOpenPopup}
            key={id}
            eventId={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.arrayOf(PropTypes.object),
  onOpenPopup: PropTypes.func.isRequired,
};

Hour.defaultProps = {
  hourEvents: [],
};

export default Hour;
