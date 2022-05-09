import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchFoodDetails from '../../services/fetchFoodDetails';
import fetchRecommendedDrinks from '../../services/fetchRecommendedDrinks';
import './FoodsDetails.css';
import ButtonShareAndFavorite from
'../../components/ButtonShareAndFavorite/ButtonShareAndFavorite';
import verifyInProgressRecipes from '../../helpers/verifyInProgressRecipes';
import BtnStateRecipe from '../../components/BtnStateRecipe/BtnStateRecipe';
import getMeasures from '../../helpers/getMeasures';

function FoodsDetails({ match: { params: { id } }, location: { pathname } }) {
  const [food, setFood] = useState({
    strMealThumb: '',
    strMeal: '',
  });
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [stateRecipe, setStateRecipe] = useState('start');

  useEffect(() => {
    const getFoodDetails = async () => {
      const meals = await fetchFoodDetails(id);
      meals[0].strYoutube = meals[0].strYoutube.replace('watch?v=', 'embed/');
      setFood(meals[0]);
    };
    getFoodDetails();
  }, [id]);

  useEffect(() => {
    const SIX = 6;
    const getRecommendedDrinks = async () => {
      const drinks = await fetchRecommendedDrinks();
      const drinksList = [...drinks].splice(0, SIX);
      setRecommendedCards(drinksList);
    };
    getRecommendedDrinks();
  }, []);

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
      const measures = getMeasures(food);
      ingredients.forEach((item, index) => {
        ingredients[index] = [...item, measures[index][1]];
      });
      setIngredientsList(ingredients);
    };
    getIngredients(food);
    if (verifyInProgressRecipes(food)) {
      setStateRecipe('inProgress');
    }
  }, [food]);

  const startRecipe = () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        [food.idMeal]: [...ingredientsList] },
    }));
    window.location.href = `/foods/${food.idMeal}/in-progress`;
  };

  return (
    <div>
      { food !== '' ? (
        <div>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            width="400px"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{food.strMeal}</h1>
          <p data-testid="recipe-category">{food.strCategory}</p>
          <div>
            <ButtonShareAndFavorite pathname={ pathname } food={ food } />
          </div>
          <div>
            <h2>Ingredients</h2>
            <ul>
              { ingredientsList.length > 0
              && ingredientsList.map((item, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ item[0] }
                >
                  { `${item[1]} - ${item[2]} ` }
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p data-testid="instructions">{food.strInstructions}</p>
          </div>
          <div>
            <iframe
              src={ food.strYoutube }
              title={ food.strMeal }
              data-testid="video"
              frameBorder="0"
              allowFullScreen
            >
              <p>Seu navegador não possui Suporte para este recurso...</p>
            </iframe>
          </div>
          <div>
            <h2>Recommended</h2>
            <div className="recomendation-cards">
              { recommendedCards.map((item, index) => (
                <div key={ index }>
                  <img
                    width="100px"
                    key={ index }
                    src={ item.strDrinkThumb }
                    data-testid={ `${index}-recomendation-card` }
                    alt={ item.strDrink }
                  />
                  <h3 data-testid={ `${index}-recomendation-title` }>{item.strDrink}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className="container-btn-start-recipe">
            <BtnStateRecipe startRecipe={ startRecipe } stateRecipe={ stateRecipe } />
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

FoodsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}.isRequired;

export default FoodsDetails;
