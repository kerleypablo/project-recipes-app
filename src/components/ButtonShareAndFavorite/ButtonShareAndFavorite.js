import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BtnShare from '../BtnShare/BtnShare';

function ButtonShareAndFavorite({ pathname }) {
  const [copy, setCopy] = useState(false);

  return (
    <div>
      <div>
        <BtnShare pathname={ pathname } setCopy={ setCopy } />
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
