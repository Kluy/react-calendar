import React from 'react';

import './header.scss';

const Header = (props) => {
  console.log('header');

  return (
    <header className="header">
      <button onClick={props.onIsModalOpen} className="button create-event-btn">
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          onClick={props.onSetCurrentWeek}
          className="navigation__today-btn button"
        >
          Today
        </button>
        <button
          onClick={props.onSubtractWeek}
          className="icon-button navigation__nav-icon"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={props.onAddWeek}
          className="icon-button navigation__nav-icon"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-months">
          {props.currentMonthName}
        </span>
      </div>
    </header>
  );
};

export default Header;
