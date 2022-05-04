import React from 'react';
import { Redirect } from 'react-router-dom';
import RecipesCard from '../Recipes/RecipesCard';

export function resulOfSearchFood(data) {
  console.log(data);
  if (data !== null && data.length > 1) {
    return (
      <div className="boxRecipe">
        {data.map((receita) => (
          <RecipesCard
            key={ receita.idMeal }
            id={ receita.idMeal }
            name={ receita.strMeal }
            thumneal={ receita.strMealThumb }
            pagina={ PageTitle }
          />
        ))}
      </div>);
  } if (data !== null && data.length === 1) {
    const paginadirect = `/${PageTitle.toLowerCase()}/${data[0].idMeal}`;
    return <Redirect to={ paginadirect } />;
  } if (data === null) {
    // eslint-disable-next-line no-alert
    alert('Sorry, we havent found any recipes for these filters');
  }
}

export function resulOfSearchDrinks(data) {
  if (data !== null && data.length > 1) {
    return (
      <div className="boxRecipe">
        {data.map((receita) => (
          <RecipesCard
            key={ receita.idDrink }
            id={ receita.idDrink }
            name={ receita.strDrink }
            thumneal={ receita.strDrinkThumb }
            pagina={ PageTitle }
          />
        ))}
      </div>);
  } if (data !== null && data.length === 1) {
    const paginadirect = `/${PageTitle.toLowerCase()}/${data[0].idDrink}`;
    return <Redirect to={ paginadirect } />;
  } if (data === null) {
    <p>Sorry, we havent found any recipes for these filters.</p>;
  }
}
