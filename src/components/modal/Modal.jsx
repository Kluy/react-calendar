import React from 'react';
import './modal.scss';

const Modal = (props) => {
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            onClick={props.onIsModalOpen}
            className="create-event__close-btn"
          >
            +
          </button>
          <form className="event-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={props.eventData.title}
              onChange={props.onSetEventData}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={props.eventData.date}
                onChange={props.onSetEventData}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={props.eventData.startTime}
                onChange={props.onSetEventData}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={props.eventData.endTime}
                onChange={props.onSetEventData}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              defaultValue={props.eventData.description}
              onChange={props.onSetEventData}
            ></textarea>
            <button
              type="submit"
              className="event-form__submit-btn"
              onClick={props.onCreateEvent}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
