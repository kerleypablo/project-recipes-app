import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header() {
  const [Search, setSearch] = useState({
    search: false,
  });

  return (
    <header>
      <Link to="/profile"><img src={ ProfileIcon } alt="profile" /></Link>
      { Search.search
        ? (
          <div>
            <input className="seacrhInput" type="text" data-testid="search-input" />
            <button
              className="searchButton"
              type="button"
              onClick={ () => setSearch({ search: false }) }
            >
              <img
                src={ SearchIcon }
                alt="search"
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
            />
          </button>
        )}
    </header>
  );
}
export default Header;
