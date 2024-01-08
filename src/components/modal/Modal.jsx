import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { postEvent } from '/src/gateway/gateway';

import './modal.scss';

const Modal = ({ onIsModalOpen, events, onGetEvents }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: moment().format('YYYY-MM-DD'),
    startTime: '',
    endTime: '',
  });

  postEvent;

  const handleCreateEvent = e => {
    e.preventDefault();

    const dateFrom = new Date(`${eventData.date}T${eventData.startTime}`);
    const dateTo = new Date(`${eventData.date}T${eventData.endTime}`);
    const eventTotalTime = dateTo.getTime() - dateFrom.getTime();

    const newEvent = events.every(
      event =>
        event.dateFrom.getTime() > dateTo.getTime() || event.dateTo.getTime() < dateFrom.getTime(),
    );

    const { title, description, date, startTime, endTime } = eventData;

    if (!title) {
      alert('Event title is empty. Please, add event title');
    } else if (!date) {
      alert('Event date is empty. Please, add event date');
    } else if (!startTime) {
      alert('Event start time is empty. Please, add event start time');
    } else if (!endTime) {
      alert('Event end time is empty. Please, add event end time');
    } else if (eventTotalTime < 0) {
      alert('End time before start time');
    } else if (eventTotalTime > 21600000) {
      alert('Event can not be longer then 6 hours');
    } else if (!newEvent) {
      alert('You have already event in this time');
    } else {
      postEvent({
        title,
        description,
        dateFrom,
        dateTo,
      }).then(() => onGetEvents());
      onIsModalOpen();
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
