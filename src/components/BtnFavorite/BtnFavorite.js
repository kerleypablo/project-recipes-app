import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import verifyIsFavorite from '../../helpers/verifyIsFavorite';
import './BtnFavorite.css';

function BtnFavorite({ food = '', drink = '', foodId = '',
  drinkId = '', func = '', datatest }) {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (typeof (food) === 'object') {
      return setIsFavorite(verifyIsFavorite(foodId));
    }
    setIsFavorite(verifyIsFavorite('', drinkId));
  }, [foodId, drinkId, food]);

  const favoriteRecipeFunc = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(true);
    if (typeof (food) === 'object') {
      if (favoriteRecipes) {
        const newArrFavorite = JSON.stringify([...favoriteRecipes, {
          id: food.idMeal,
          type: 'food',
          nationality: food.strArea,
          category: food.strCategory,
          alcoholicOrNot: '',
          name: food.strMeal,
          image: food.strMealThumb,
        }]);
        return localStorage.setItem('favoriteRecipes', newArrFavorite);
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: food.idMeal,
        type: 'food',
        nationality: food.strArea,
        category: food.strCategory,
        alcoholicOrNot: '',
        name: food.strMeal,
        image: food.strMealThumb,
      }]));
    } else {
      if (favoriteRecipes) {
        const newArrFavorite = JSON.stringify([...favoriteRecipes, {
          id: drink.idDrink,
          type: 'drink',
          nationality: '',
          category: drink.strCategory,
          alcoholicOrNot: drink.strAlcoholic,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        }]);
        return localStorage.setItem('favoriteRecipes', newArrFavorite);
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify([{
        id: drink.idDrink,
        type: 'drink',
        nationality: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      }]));
    }
  };

  const removeFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipe = favoriteRecipes.find((item) => item.id === foodId
    || item.id === drinkId);
    favoriteRecipes.filter((item) => item !== recipe);
    setIsFavorite(false);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(favoriteRecipes.filter((item) => item !== recipe)));
    if (typeof (func) === 'function') {
      func();
    }
  };

  return (
    <div className="btnFavorite">
      { isFavorite ? (
        <button
          data-testid="favorite-btn"
          type="button"
          src={ blackHeartIcon }
          onClick={ () => removeFavorite() }
        >
          <img src={ blackHeartIcon } alt="Icon black heart" data-testid={ datatest } />
        </button>
      ) : (
        <button
          data-testid="favorite-btn"
          type="button"
          src={ whiteHeartIcon }
          onClick={ () => favoriteRecipeFunc() }
        >
          <img src={ whiteHeartIcon } alt="Icon white heart" data-testid={ datatest } />
        </button>
      )}
    </div>
  );
}

BtnFavorite.propTypes = {
  food: PropTypes.shape(),
  drink: PropTypes.shape(),
}.isRequired;

export default BtnFavorite;
