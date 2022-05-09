import React from 'react';
import PropTypes from 'prop-types';
import './RecipesCard.css';
import { Link, useLocation } from 'react-router-dom';

function RecipeCard({ id, name, thumneal, index }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={ `/${pathname.includes('foods') ? 'foods' : 'drinks'}/${id}` }
    >
      <div className="card" key={ id } data-testid={ `${index}-recipe-card` }>
        <div>
          <p data-testid={ `${index}-card-name` }>{ name }</p>
          <img src={ thumneal } alt={ name } data-testid={ `${index}-card-img` } />
        </div>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  thumneal: PropTypes.string,
  pagina: PropTypes.string,
}.isRequired;

export default RecipeCard;
