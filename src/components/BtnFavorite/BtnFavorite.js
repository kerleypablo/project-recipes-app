import React from 'react';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function BtnShare() {
  return (
    <div>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        <img src={ whiteHeartIcon } alt="coração-branco" />
      </button>
    </div>
  );
}

export default BtnShare;
