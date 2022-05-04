import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import verifyIsFavorite from '../../helpers/verifyIsFavorite';

function BtnFavorite({ food = {}, drink = {} }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(verifyIsFavorite(food, drink));
  }, [food, drink]);

  const favoriteRecipeFunc = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setIsFavorite(true);
    if (food.idMeal !== undefined) {
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
    const recipe = favoriteRecipes.find((item) => item.id === food.idMeal
    || item.id === drink.idDrink);
    favoriteRecipes.filter((item) => item !== recipe);
    setIsFavorite(false);
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(favoriteRecipes.filter((item) => item !== recipe)));
  };

  return (
    <div>
      { isFavorite ? (
        <button
          data-testid="favorite-btn"
          type="button"
          src={ blackHeartIcon }
          onClick={ () => removeFavorite() }
        >
          <img src={ blackHeartIcon } alt="Icon black heart" />
        </button>
      ) : (
        <button
          data-testid="favorite-btn"
          type="button"
          src={ whiteHeartIcon }
          onClick={ () => favoriteRecipeFunc() }
        >
          <img src={ whiteHeartIcon } alt="Icon white heart" />
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
