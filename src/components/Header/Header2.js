import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../../images/profileIcon.svg';
import './Header.css';

function Header2({ PageTitle }) {
  return (
    <header>
      <Link to="/profile">
        <img
          src={ ProfileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h3 className="title" data-testid="page-title">{ PageTitle }</h3>
    </header>
  );
}

Header2.propTypes = {
  PageTitle: PropTypes.string,
}.isRequired;

export default Header2;
