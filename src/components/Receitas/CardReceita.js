import React from 'react';
import PropTypes from 'prop-types';
import './CardReceita.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function CardReceita({ id, name, thumneal, pagina, index }) {
  name.toLowerCase();
  return (
    <Link to={ `/${pagina.toLowerCase()}/${id}` }>
      <div className="boxCard" key={ id } data-testid={ `${index}-recipe-card` }>
        <div>
          <p data-testid={ `${index}-card-name` }>{ name }</p>
          <img src={ thumneal } alt={ name } data-testid={ `${index}-card-img` } />
        </div>
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
