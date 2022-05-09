import React from 'react';
import PropTypes from 'prop-types';

const BtnStateRecipe = ({ startRecipe, stateRecipe }) => (
  <div>
    { stateRecipe !== 'doneRecipe' && (
      <div>
        { stateRecipe === 'start' ? (
          <button
            type="button"
            className="start-recipe"
            data-testid="start-recipe-btn"
            onClick={ startRecipe }
          >
            Start Recipe
          </button>
        ) : (
          <button
            type="button"
            className="start-recipe"
            data-testid="start-recipe-btn"
            onClick={ startRecipe }
          >
            Continue Recipe
          </button>
        )}
      </div>
    )}
  </div>
);

BtnStateRecipe.propTypes = {
  startRecipe: PropTypes.func,
  stateRecipe: PropTypes.string,
}.isRequired;

export default BtnStateRecipe;
