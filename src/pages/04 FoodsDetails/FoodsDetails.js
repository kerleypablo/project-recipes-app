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
import verifyDoneRecipes from '../../helpers/verifyDoneRecipes';
import Style from './FoodDetail.module.css';

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
      ingredients = getMeasures(food, ingredients);
      setIngredientsList(ingredients);
    };
    getIngredients(food);
    if (verifyDoneRecipes(food)) {
      setStateRecipe('doneRecipe');
    } else if (verifyInProgressRecipes(food)) {
      setStateRecipe('inProgress');
    }
  }, [food]);

  const startRecipe = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes) {
      const addRecipe = Object
        .assign(inProgressRecipes.meals, ({ [food.idMeal]: [...ingredientsList] }));
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...inProgressRecipes,
        meals: addRecipe,
      }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: {
          [food.idMeal]: [...ingredientsList] },
        cocktails: {},
      }));
    }
    window.location.href = `/foods/${food.idMeal}/in-progress`;
  };

  return (
    <div className={ Style.container_main_foodDetails }>
      { food !== '' ? (
        <div>
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
            width="100%"
            height="400px"
            data-testid="recipe-photo"
            className={ Style.foodimg_Details }
          />
          <div className={ Style.container_title }>
            <div>
              <h1
                data-testid="recipe-title"
                className={ Style.name_recipes_detail }
              >
                {food.strMeal}

              </h1>
              <p data-testid="recipe-category">{food.strCategory}</p>
            </div>
            <div className={ Style.container_btn_share_and_favorite }>
              <ButtonShareAndFavorite pathname={ pathname } food={ food } />
            </div>
          </div>
          <div className={ Style.boxRecipies }>
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
          <div className={ Style.boxInstructions }>
            <h2>Instructions</h2>
            <p
              className={ Style.pInstuctions }
              data-testid="instructions"
            >
              {food.strInstructions}
            </p>
          </div>
          <div>
            <iframe
              src={ food.strYoutube }
              title={ food.strMeal }
              data-testid="video"
              frameBorder="0"
              allowFullScreen
              className={ Style.youtube }
            >
              <p>Seu navegador não possui Suporte para este recurso...</p>
            </iframe>
          </div>
          <div className={ Style.recomendation_box }>
            <h2>Recommended</h2>
            <div className={ Style.recomendation_cards }>
              { recommendedCards.map((item, index) => (
                <div className={ Style.cardRecomended } key={ index }>
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
          <div className={ Style.container_btn_start_recipe }>
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
