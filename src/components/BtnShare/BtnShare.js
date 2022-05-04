import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function BtnShare({ pathname, setCopy }) {
  const copyToClipBoard = async (link) => {
    const url = `http://localhost:3000${link}`;
    navigator.clipboard.writeText(url).then(
      () => setCopy(true),
    ).catch((error) => console.log(error));
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => copyToClipBoard(pathname) }
      >
        <img src={ shareIcon } alt="share-icon" />
      </button>
    </div>
  );
}

BtnShare.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;

export default BtnShare;
