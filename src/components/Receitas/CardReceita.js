import React from 'react';
import PropTypes from 'prop-types';
import './CardReceita.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function CardReceita({ id, name, thumneal, pagina }) {
  name.toLowerCase();
  return (
    <Link to={ `/${pagina.toLowerCase()}/${id}` }>
      <div className="boxCard" key={ id }>
        <div>
          <p>{ name }</p>
          <img src={ thumneal } alt={ name } />
        </div>
      </div>
    </Link>
  );
}

CardReceita.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumneal: PropTypes.string.isRequired,
  pagina: PropTypes.string.isRequired,
};

export default CardReceita;
