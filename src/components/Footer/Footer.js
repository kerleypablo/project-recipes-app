import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import Style from './Footer.module.css';

function Footer() {
  return (
    <footer className={ Style.footer } data-testid="footer">
      <Link
        to="/drinks"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        className={ Style.link }
      >
        <img src={ drinkIcon } alt="drink Icon" />
      </Link>
      <Link
        to="/explore"
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
        className={ Style.link }
      >
        <img src={ exploreIcon } alt="explore Icon" />
      </Link>
      <Link
        to="/foods"
        src={ mealIcon }
        data-testid="food-bottom-btn"
        className={ Style.link }
      >
        <img src={ mealIcon } alt="meal Icon" />
      </Link>
    </footer>
  );
}

export default Footer;
