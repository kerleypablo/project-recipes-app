import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchDrinkDetails from '../../services/fetchDrinkDetails';

function DrinksDetails({ match: { params: { id } } }) {
  const [drink, setDrink] = useState('');

  const [ingredientsList, setIngredientsList] = useState([]);
  const [recommendedCards, setRecommendedCards] = useState([]);

  useEffect(() => {
    const getDrinkDetails = async () => {
      const drinks = await fetchDrinkDetails(id);
      setDrink(drinks[0]);
      console.log(drinks[0]);
      setRecommendedCards([
        { name: drinks[0].strDrink, thumb: drinks[0].strDrinkThumb },
        { name: drinks[0].strDrink, thumb: drinks[0].strDrinkThumb }]);
    };
    getDrinkDetails();
  }, [id]);

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
      setIngredientsList(ingredients);
    };
    getIngredients(drink);
  }, [drink]);

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
          <p data-testid="recipe-category">{drink.strCategory}</p>
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
            <p data-testid="instructions">{drink.strInstructions}</p>
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

DrinksDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinksDetails;
