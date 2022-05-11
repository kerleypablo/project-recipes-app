import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Style from './RecipesCard.module.css';

function RecipeCard({ id, name, thumneal, index }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={ `/${pathname.includes('foods') ? 'foods' : 'drinks'}/${id}` }
      data-testid={ `${index}-recipe-card` }
    >
      <div className={ Style.card } key={ id }>
        <p data-testid={ `${index}-card-name` }>{ name }</p>
        <img src={ thumneal } alt={ name } data-testid={ `${index}-card-img` } />
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
