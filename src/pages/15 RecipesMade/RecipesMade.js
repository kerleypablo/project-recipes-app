import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header2';
import CardReceitaDone from '../../components/Receitas/CardReceitaDone';
import './RecipesMade.css';

const teste = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

function RecipesMade() {
  const [SelectedType, setSelectedType] = useState('');

  useEffect(() => {

  }, [SelectedType]);

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
      <Header PageTitle="Done Recipes" />
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
          teste.filter((tipo) => (tipo.type !== SelectedType))
            .map((receita, index) => (
              <div key={ index }>
                <CardReceitaDone
                  date={ receita.doneDate }
                  id={ receita.id }
                  index={ index }
                  nacionalidade={ receita.nationality }
                  name={ receita.name }
                  thumneal={ receita.image }
                  key={ index }
                  pagina={ `${receita.type}s` }
                  tagsCard={ receita.tags }
                  category={ receita.category }
                  alcholic={ receita.alcoholicOrNot }
                />
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default RecipesMade;
