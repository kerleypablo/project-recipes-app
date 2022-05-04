import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link
        to="/drinks"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        className="link , selectedDrink"
      >
        <img src={ drinkIcon } alt="drink Icon" />
      </Link>
      <Link
        to="/explore"
        src={ exploreIcon }
        data-testid="explore-bottom-btn"
        className="link , selectedexplorer"
      >
        <img src={ exploreIcon } alt="explore Icon" />
      </Link>
      <Link
        to="/foods"
        src={ mealIcon }
        data-testid="food-bottom-btn"
        className="link , selectedMeal"
      >
        <img src={ mealIcon } alt="meal Icon" />
      </Link>
    </footer>
  );
}

export default Footer;
