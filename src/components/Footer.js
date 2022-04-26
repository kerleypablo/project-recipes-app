import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks" data-testid="drinks-bottom-btn"><span>Bebidas</span></Link>
      <Link to="/explore" data-testid="explore-bottom-btn"><span>Explore</span></Link>
      <Link to="/food" data-testid="food-bottom-btn"><span>Comida</span></Link>
    </footer>
  );
}

export default Footer;
