import React, { useEffect } from 'react';
import Hour from '../hour/Hour';
import Line from '../Line/Line';

import './day.scss';

const Day = ({ dataDay, dayEvents, onOpenPopup, onGetEventId }) => {
  const currentHours = new Date().getHours();
  const minutes = new Date().getMinutes();

  const styles = {
    top: currentHours * 60 - currentHours + minutes,
  };

  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  // if (dataDay === new Date().getDate()) {
  //   setInterval(() => {
  //     styles.top += 1;
  //   }, 1000);
  // }
  console.log('day');

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            onGetEventId={onGetEventId}
            onOpenPopup={onOpenPopup}
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
          />
        );
      })}
      {/* {dataDay === new Date().getDate() && (
        <div style={{ top: styles.top }} className="line"></div>
      )} */}
      {dataDay === new Date().getDate() && <Line />}
    </div>
  );
};

export default Day;
