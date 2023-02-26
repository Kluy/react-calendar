import React, { useState } from 'react';
import { postEvent } from '../../gateway/gateway';
import PropTypes from 'prop-types';
import moment from 'moment';
import './modal.scss';

const Modal = ({ onIsModalOpen, events, onGetEvents }) => {
  console.log(events);

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: moment().format('YYYY-MM-DD'),
    startTime: '',
    endTime: '',
  });

  const dateFrom = new Date(`${eventData.date}T${eventData.startTime}`);
  const dateTo = new Date(`${eventData.date}T${eventData.endTime}`);
  const eventTotalTime = dateTo.getTime() - dateFrom.getTime();

  const eventIndex = events.findIndex(event => {
    return (
      (dateFrom.getTime() >= event.dateFrom.getTime() &&
        dateFrom.getTime() <= event.dateTo.getTime()) ||
      (dateTo.getTime() >= event.dateFrom.getTime() && dateTo.getTime() <= event.dateTo.getTime())
    );
  });

  const handleCreateEvent = e => {
    e.preventDefault();

    // console.log(events.filter(event => event.dateFrom.getDate() === dateFrom.getDate()));

    // const filteredArr = events
    //   .filter(event => event.dateFrom.getDate() === dateFrom.getDate())
    //   .includes(
    //     event =>
    //       event.dateFrom.getDate() < dateFrom.getDate() < event.dateTo.getDate() ||
    //       event.dateFrom.getDate() < dateTo.getDate() < event.dateTo.getDate(),
    //   );
    // const filteredArr2 = events.filter(event => event.dateFrom.getDate() === dateFrom.getDate()).find(event => );

    // console.log(filteredArr);
    const { title, description } = eventData;

    if (eventData.startTime > eventData.endTime) {
      alert('Событие заканчивается раньше чем начинается');
    } else if (eventTotalTime > 21600000) {
      alert('Событие дольше 6 часов');
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
            {eventData.title ? (
              ''
            ) : (
              <div className="event-form__validation">Введите название события</div>
            )}
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
              {eventTotalTime > 21600000 ? (
                <div className="event-form__validation">The event must be shorter then 6 hours</div>
              ) : (
                ''
              )}
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              defaultValue={eventData.description}
              onChange={handleSetEventData}
            ></textarea>
            <button
              disabled={
                !eventData.title || !eventData.date || !eventData.endTime || !eventData.startTime
              }
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
