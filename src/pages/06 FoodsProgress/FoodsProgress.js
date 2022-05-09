import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ButtonShareAndFavorite
from '../../components/ButtonShareAndFavorite/ButtonShareAndFavorite';
import fetchFoodDetails from '../../services/fetchFoodDetails';
import getMeasures from '../../helpers/getMeasures';
import './FoodsProgress.css';

function FoodsProgress({ match: { params: { id } }, location: { pathname } }) {
  const history = useHistory();
  const [food, setFood] = useState({
    strMealThumb: '',
    strMeal: '',
  });
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const getFoodDetails = async () => {
      const meals = await fetchFoodDetails(id);
      meals[0].strYoutube = meals[0].strYoutube.replace('watch?v=', 'embed/');
      setFood(meals[0]);
    };
    getFoodDetails();
  }, [id]);

  useEffect(() => {
    const getIngredients = (meals) => {
      const arrFilter = (Object.keys(meals)
        .filter((item) => item.includes('strIngredient')));
      let ingredients = [];
      Object.entries(meals).forEach((item) => {
        const findIngredient = arrFilter
          .find((e) => e === item[0] && item[1] !== '' && item[1] !== null);
        if (findIngredient) {
          ingredients = [...ingredients, item];
        }
      });
      ingredients = getMeasures(food, ingredients);
      setIngredientsList(ingredients);
    };
    getIngredients(food);
  }, [food]);

  const finishRecipe = () => {
    history.push('/done-recipes');
  };

  return (
    <div className="container-main-foodProgress">
      { food !== '' ? (
        <div>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            width="100%"
            height="400px"
            data-testid="recipe-photo"
          />
          <div className="container-title">
            <div>
              <h1 data-testid="recipe-title">{food.strMeal}</h1>
              <p data-testid="recipe-category">{food.strCategory}</p>
            </div>
            <div className="container-btn-share-and-favorite">
              <ButtonShareAndFavorite
                pathname={ pathname.replace('/in-progress', '') }
                food={ food }
              />
            </div>
          </div>
          <div>
            <h2>Ingredients</h2>
            <div className="container-checkbox-inputs">
              { ingredientsList.length > 0
              && ingredientsList.map((item, index) => (
                <label
                  key={ item[0] }
                  htmlFor={ `${index}-ingredient-step` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    id={ `${index}-ingredient-step` }
                  />
                  { `${item[1]} ${item[2]} ${item[3]} ` }
                </label>
              ))}
            </div>
          </div>
          <div>
            <h2>Instructions</h2>
            <p data-testid="instructions">{food.strInstructions}</p>
          </div>
          <div className="container-btn-start-recipe">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ finishRecipe }
            >
              Finish Recipe
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      ) }
    </div>
  );
}

FoodsProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default FoodsProgress;
