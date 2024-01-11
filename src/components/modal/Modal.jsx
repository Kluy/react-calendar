import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { postEvent } from '/src/gateway/gateway';
import { getDate } from '/src/utils/dateUtils';
import { checkEventCrossing, checkEventDuration, checkEventData } from '/src/utils/eventUtils';

import './modal.scss';

const Modal = ({ onIsModalOpen, events, onGetEvents }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: moment().format('YYYY-MM-DD'),
    startTime: '',
    endTime: '',
  });

  const handleCreateEvent = e => {
    e.preventDefault();

    const { title, description, date, startTime, endTime } = eventData;

    if (checkEventData(title, date, startTime, endTime)) {
      const dateFrom = getDate(date, startTime);
      const dateTo = getDate(date, endTime);
      const timeFrom = dateFrom.getTime();
      const timeTo = dateTo.getTime();
      if (checkEventDuration(timeFrom, timeTo) && checkEventCrossing(events, timeFrom, timeTo)) {
        postEvent({
          title,
          description,
          dateFrom,
          dateTo,
        }).then(() => onGetEvents());
        onIsModalOpen();
      }
    }
  };

  const handleSetEventData = e => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button onClick={onIsModalOpen} className="create-event__close-btn">
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={eventData.title}
              onChange={handleSetEventData}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={eventData.date}
                onChange={handleSetEventData}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={eventData.startTime}
                onChange={handleSetEventData}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={eventData.endTime}
                onChange={handleSetEventData}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              defaultValue={eventData.description}
              onChange={handleSetEventData}
            ></textarea>
            <button type="submit" className="event-form__submit-btn" onClick={handleCreateEvent}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onIsModalOpen: PropTypes.func.isRequired,
  onGetEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Modal;
