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
                onChange={props.onSetEventData}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                onChange={props.onSetEventData}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
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
              onClick={() => {}}
              type="submit"
              className="event-form__submit-btn"
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
