import React from 'react';
import PropTypes from 'prop-types';
import './RecipesCard.css';
import { Link } from 'react-router-dom';

function RecipeCard({ id, name, thumneal, pagina, index }) {
  return (
    <div className="boxScreen">
      <Link to={ `/${pagina}/${id}` }>
        <div className="boxCard" key={ id } data-testid={ `${index}-recipe-card` }>
          <div>
            <p data-testid={ `${index}-card-name` }>{ name }</p>
            <img src={ thumneal } alt={ name } data-testid={ `${index}-card-img` } />
          </div>
        </div>
      </Link>
    </div>
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
