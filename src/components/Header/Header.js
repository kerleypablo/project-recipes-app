import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import './Header.css';

function Header({ PageTitle }) {
  const [Search, setSearch] = useState({
    search: false,
  });

  return (
    <header>
      <Link to="/profile">
        <img
          src={ ProfileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h3 data-testid="page-title">{ PageTitle }</h3>
      { Search.search
        ? (
          <div>
            <input className="searchInput" type="text" data-testid="search-input" />
            <button
              className="searchButton"
              type="button"
              onClick={ () => setSearch({ search: false }) }
            >
              <img
                src={ SearchIcon }
                alt="search"
                data-testid="search-top-btn"
              />
            </button>
          </div>
        )
        : (
          <button
            type="button"
            className="searchButton"
            onClick={ () => setSearch({ search: true }) }
          >
            <img
              src={ SearchIcon }
              alt="search"
              data-testid="search-top-btn"
            />
          </button>
        )}
    </header>
  );
}

Header.propTypes = {
  PageTitle: PropTypes.string,
}.isRequired;

export default Header;
