import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchFoodDetails from '../../services/fetchFoodDetails';
import fetchRecommendedDrinks from '../../services/fetchRecommendedDrinks';
import './FoodsDetails.css';

function FoodsDetails({ match: { params: { id } }, location: { pathname } }) {
  const [food, setFood] = useState({
    strMealThumb: '',
    strMeal: '',
  });
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [copy, setCopy] = useState(false);

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
    const getMeasures = (meals) => {
      const arrFilter = Object.keys(meals).filter((item) => item.includes('strMeasure'));
      let measures = [];
      Object.entries(meals).forEach((item) => {
        const findMeasure = arrFilter
          .find((e) => e === item[0] && item[1] !== '' && item[1] !== null);
        if (findMeasure) {
          measures = [...measures, item];
        }
      });
      return measures;
    };

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
  }, [food]);

  const copyToClipBoard = async (link) => {
    const url = `http://localhost:3000${link}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopy(true);
    } catch (error) {
      console.log(error);
    }
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
          <div className="container-share-and-favorite-btn">
            <button
              data-testid="share-btn"
              type="button"
              onClick={ () => copyToClipBoard(pathname) }
            >
              Share
            </button>
            <button
              data-testid="favorite-btn"
              type="button"
            >
              Favoritar
            </button>
          </div>
          {copy && (
            <div>
              <p>Link copied!</p>
            </div>
          )}
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
            <button
              type="button"
              className="start-recipe"
              data-testid="start-recipe-btn"
              onClick={ () => {
                window.location.href = `/foods/${food.idMeal}/in-progress`;
              } }
            >
              Start Recipe
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

FoodsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default FoodsDetails;
