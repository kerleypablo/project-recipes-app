import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BtnShare from '../BtnShare/BtnShare';
import BtnFavorite from '../BtnFavorite/BtnFavorite';
import './ButtonShareAndFavorite.css';

function ButtonShareAndFavorite({ pathname, drink = '', food = '' }) {
  const [copy, setCopy] = useState(false);

  return (
    <div>
      <div className="container-share-and-favorite-btn">
        <BtnShare pathname={ pathname } setCopy={ setCopy } />
        { drink === '' ? (
          <BtnFavorite food={ food } />
        ) : (
          <BtnFavorite drink={ drink } />
        )}
      </div>
      {copy && (
        <div>
          <p>Link copied!</p>
        </div>
      )}
    </div>
  );
}

ButtonShareAndFavorite.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;

export default ButtonShareAndFavorite;
