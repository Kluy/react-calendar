import React, { useState } from 'react';
import { postEvent } from '../../gateway/gateway';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = ({ onIsModalOpen, onGetEvents }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const dateFrom = new Date(`${eventData.date}T${eventData.startTime}`);
    const dateTo = new Date(`${eventData.date}T${eventData.endTime}`);
    const { title, description } = eventData;
    postEvent({
      title,
      description,
      dateFrom,
      dateTo,
    }).then(() => onGetEvents());
    onIsModalOpen();
  };

  const handleSetEventData = (e) => {
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
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={handleCreateEvent}
            >
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
};

export default Modal;
