import React from 'react';
import PropTypes from 'prop-types';

import './header.scss';

const Header = ({
  onIsModalOpen,
  onSetCurrentWeek,
  onSubtractWeek,
  onAddWeek,
  currentMonthName,
}) => {
  console.log('header');

  return (
    <header className="header">
      <button onClick={onIsModalOpen} className="button create-event-btn">
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          onClick={onSetCurrentWeek}
          className="navigation__today-btn button"
        >
          Today
        </button>
        <button
          onClick={onSubtractWeek}
          className="icon-button navigation__nav-icon"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={onAddWeek}
          className="icon-button navigation__nav-icon"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-months">{currentMonthName}</span>
      </div>
    </header>
  );
};

Header.propTypes = {
  currentMonthName: PropTypes.string,
  onIsModalOpen: PropTypes.func.isRequired,
  onSetCurrentWeek: PropTypes.func.isRequired,
  onSubtractWeek: PropTypes.func.isRequired,
  onAddWeek: PropTypes.func.isRequired,
};

Header.defaultProps = {
  currentMonthName: '',
};

export default Header;
