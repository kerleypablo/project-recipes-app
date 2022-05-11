import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Style from './cardReceita.module.css';

function CardReceita({ id, name, thumneal, pagina, index }) {
  name.toLowerCase();
  return (
    <Link to={ `/${pagina.toLowerCase()}/${id}` }>
      <div className={ Style.boxCard } key={ id } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{ name }</p>
        <img src={ thumneal } alt={ name } data-testid={ `${index}-card-img` } />
      </div>
    </Link>
  );
}

CardReceita.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  thumneal: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
};

export default CardReceita;
