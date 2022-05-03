import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchDrinkDetails from '../../services/fetchDrinkDetails';
import fetchRecommendedMeals from '../../services/fetchRecommendedMeals';

function DrinksDetails({ match: { params: { id } }, location: { pathname } }) {
  const [drink, setDrink] = useState('');

  const [ingredientsList, setIngredientsList] = useState([]);
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    const getDrinkDetails = async () => {
      const drinks = await fetchDrinkDetails(id);
      setDrink(drinks[0]);
    };
    getDrinkDetails();
  }, [id]);

  useEffect(() => {
    const SIX = 6;
    const getRecommendedMeals = async () => {
      const meals = await fetchRecommendedMeals();
      const mealsList = [...meals].splice(0, SIX);
      setRecommendedCards(mealsList);
    };
    getRecommendedMeals();
  }, []);

  useEffect(() => {
    const getMeasures = (drinks) => {
      const arrFilter = Object.keys(drinks).filter((item) => item.includes('strMeasure'));
      let measures = [];
      Object.entries(drinks).forEach((item) => {
        const findMeasure = arrFilter
          .find((e) => e === item[0] && item[1] !== '' && item[1] !== null);
        if (findMeasure) {
          measures = [...measures, item];
        }
      });
      return measures;
    };

    const getIngredients = (drinks) => {
      const arrFilter = (Object.keys(drinks)
        .filter((item) => item.includes('strIngredient')));
      let ingredients = [];
      Object.entries(drinks).forEach((item) => {
        const findIngredient = arrFilter
          .find((e) => e === item[0] && item[1] !== '' && item[1] !== null);
        if (findIngredient) {
          ingredients = [...ingredients, item];
        }
      });
      const measures = getMeasures(drinks);
      ingredients.forEach((item, index) => {
        ingredients[index] = [...item, measures[index][1]];
      });
      setIngredientsList(ingredients);
    };
    getIngredients(drink);
  }, [drink]);

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
      { drink !== '' ? (
        <div>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            width="400px"
            data-testid="recipe-photo"
          />
          <h1 data-testid="recipe-title">{drink.strDrink}</h1>
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
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
            <p data-testid="instructions">{drink.strInstructions}</p>
          </div>
          <div>
            <h2>Recommended</h2>
            <div className="recomendation-cards">
              { recommendedCards.map((item, index) => (
                <div key={ index }>
                  <img
                    width="100px"
                    key={ index }
                    src={ item.strMealThumb }
                    data-testid={ `${index}-recomendation-card` }
                    alt={ item.strMeal }
                  />
                  <h3 data-testid={ `${index}-recomendation-title` }>{item.strMeal}</h3>
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
                window.location.href = `/drinks/${drink.idDrink}/in-progress`;
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

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinksDetails;
