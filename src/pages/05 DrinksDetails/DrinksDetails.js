import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchDrinkDetails from '../../services/fetchDrinkDetails';
import fetchRecommendedMeals from '../../services/fetchRecommendedMeals';
import ButtonShareAndFavorite from
'../../components/ButtonShareAndFavorite/ButtonShareAndFavorite';
import verifyInProgressRecipes from '../../helpers/verifyInProgressRecipes';
import BtnStateRecipe from '../../components/BtnStateRecipe/BtnStateRecipe';
import getMeasures from '../../helpers/getMeasures';
import verifyDoneRecipes from '../../helpers/verifyDoneRecipes';

function DrinksDetails({ match: { params: { id } }, location: { pathname } }) {
  const [drink, setDrink] = useState('');

  const [ingredientsList, setIngredientsList] = useState([]);
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [stateRecipe, setStateRecipe] = useState('start');

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
      ingredients = getMeasures(drinks, ingredients);
      setIngredientsList(ingredients);
    };
    getIngredients(drink);
    if (verifyDoneRecipes({}, drink)) {
      setStateRecipe('doneRecipe');
    } else if (verifyInProgressRecipes({}, drink)) {
      setStateRecipe('inProgress');
    }
  }, [drink]);

  const startRecipe = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const addRecipe = Object
        .assign(inProgressRecipes.cocktails, ({ [drink.idDrink]: [...ingredientsList] }));
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        cocktails: addRecipe,
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {},
        cocktails: {
          [drink.idDrink]: [...ingredientsList] },
      }));
    }
    window.location.href = `/drinks/${drink.idDrink}/in-progress`;
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
          <div>
            <ButtonShareAndFavorite pathname={ pathname } drink={ drink } />
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
                  { `${item[1]} ${item[2]} ${item[3]} ` }
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Instructions</h2>
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

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinksDetails;
