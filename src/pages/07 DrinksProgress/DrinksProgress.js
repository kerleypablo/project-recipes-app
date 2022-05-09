import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchDrinkDetails from '../../services/fetchDrinkDetails';
import getMeasures from '../../helpers/getMeasures';
import ButtonShareAndFavorite
from '../../components/ButtonShareAndFavorite/ButtonShareAndFavorite';
import './DrinksProgress.css';

function DrinksProgress({ match: { params: { id } }, location: { pathname } }) {
  const [drink, setDrink] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const getDrinkDetails = async () => {
      const drinks = await fetchDrinkDetails(id);
      setDrink(drinks[0]);
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
      ingredients = getMeasures(drinks, ingredients);
      setIngredientsList(ingredients);
    };
    getIngredients(drink);
  }, [drink]);

  const finishRecipe = () => {
    console.log('finish');
    // window.location.href = `/drinks/${drink.idDrink}/in-progress`;
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
            <p data-testid="instructions">{drink.strInstructions}</p>
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

DrinksProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinksProgress;
