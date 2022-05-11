import React from 'react';
import { Redirect } from 'react-router-dom';
import CardReceita from '../Receitas/CardReceita';
import Style from './Header.module.css';

export function resulOfSearchFood(data) {
  console.log(data);
  if (data !== null && data.length > 1) {
    return (
      <div className={ Style.boxRecipe }>
        {data.map((receita) => (
          <CardReceita
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
    alert('Sorry, we haven\'t found any recipes for these filters.');
  }
}

export function resulOfSearchDrinks(data) {
  if (data !== null && data.length > 1) {
    return (
      <div className={ Style.boxRecipe }>
        {data.map((receita) => (
          <CardReceita
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
