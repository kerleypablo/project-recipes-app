import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="drink Icon" />
      </Link>
      <Link to="/explore" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="explore Icon" />
      </Link>
      <Link to="/food" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="meal Icon" />
      </Link>
    </footer>
  );
}

export default Footer;
