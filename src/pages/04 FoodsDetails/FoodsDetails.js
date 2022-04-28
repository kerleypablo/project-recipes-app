import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchFoodDetails from '../../services/fetchFoodDetails';

function FoodsDetails({ match: { params: { id } } }) {
  const [food, setFood] = useState({
    strMealThumb: '',
    strMeal: '',
  });
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recommendedCards, setRecommendedCards] = useState([]);

  useEffect(() => {
    const getFoodDetails = async () => {
      const meals = await fetchFoodDetails(id);
      meals[0].strYoutube = meals[0].strYoutube.replace('watch?v=', 'embed/');
      setFood(meals[0]);
      setRecommendedCards([
        { name: meals[0].strMeal, thumb: meals[0].strMealThumb },
        { name: meals[0].strMeal, thumb: meals[0].strMealThumb }]);
      console.log(meals[0]);
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
      setIngredientsList(ingredients);
    };
    getIngredients(food);
  }, [food]);

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
            <button
              data-testid="share-btn"
              type="button"
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
          <div>
            <h2>Ingredients</h2>
            <ul>
              { ingredientsList.map((item, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ item[0] }
                >
                  { item[1] }
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
            { recommendedCards.map((item, index) => (
              <img
                width="100px"
                key={ index }
                src={ item.thumb }
                data-testid={ `${index}-recomendation-card` }
                alt={ item.name }
              />
            ))}
          </div>
          <div>
            <button
              type="button"
              data-testid="start-recipe-btn"
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
