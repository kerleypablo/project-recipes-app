import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header2';
import CardFavotiteRecipies from '../../components/Receitas/CardFavotiteRecipies';
import './FavoritesRecipes.css';

function FavoritesRecipes() {
  let Favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const Donerecipies = localStorage.DoneRecipies;
  const [SelectedType, setSelectedType] = useState('');
  const [FavoritesAndDone, setFavoritesandDone] = useState(Favorites, Donerecipies);
  console.log(FavoritesAndDone);
  useEffect(() => {

  }, [SelectedType, Favorites]);

  const RemoveFavoriteLocalstorage = () => {
    Favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoritesandDone(Favorites, Donerecipies);
    console.log('executei');
  };

  function filterDoneRecipes({ target }) {
    if (target.name === 'food') {
      setSelectedType('drink');
    } else if (target.name === 'drink') {
      setSelectedType('food');
    } else {
      setSelectedType('');
    }
  }

  return (
    <div>
      <Header PageTitle="Favorite Recipes" />
      <div className="box-btmdoneRecipes">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="all"
          onClick={ filterDoneRecipes }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="food"
          onClick={ filterDoneRecipes }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="drink"
          onClick={ filterDoneRecipes }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          FavoritesAndDone
          && FavoritesAndDone.filter((tipo) => (tipo.type !== SelectedType))
            .map((receita, index) => (
              <div key={ index }>
                <CardFavotiteRecipies
                  id={ receita.id }
                  index={ index }
                  nacionalidade={ receita.nationality }
                  name={ receita.name }
                  thumneal={ receita.image }
                  key={ index }
                  pagina={ `${receita.type}s` }
                  tagsCard={ [''] }
                  category={ receita.category }
                  alcholic={ receita.alcoholicOrNot }
                  type={ receita.type }
                  receita={ receita }
                  func={ RemoveFavoriteLocalstorage }
                />
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default FavoritesRecipes;
