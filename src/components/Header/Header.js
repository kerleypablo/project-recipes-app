import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import './Header.css';
import HeaderApiFood from '../../redux/Services/HeaderApiFood';
import HeaderApiDrinks from '../../redux/Services/HeaderApiDrinks';
import CardReceita from '../Receitas/CardReceita';

function Header({ PageTitle }) {
  const [Search, setSearch] = useState({
    search: false,
    RadioSelected: '',
    searchValue: '',
  });
  const [Data, setData] = useState([]);

  const handleButton = async () => {
    const valueRadio = document.querySelector('input:checked').value;
    const ValueTextInput = document.querySelector('.searchInput').value;

    if (PageTitle === 'Drinks') {
      const resultdata = await HeaderApiDrinks(valueRadio, ValueTextInput);
      setData(resultdata.drinks);
    } if (PageTitle === 'Foods') {
      const resultdata = await HeaderApiFood(valueRadio, ValueTextInput);
      console.log(resultdata.meals);
      setData(resultdata.meals);
    }
    setSearch((prevState) => (
      {
        ...prevState,
        RadioSelected: valueRadio,
        searchValue: ValueTextInput,
      }
    ));
  };

  function resulOfSearchFood() {
    console.log(Data);
    if (Data !== null && Data.length > 1) {
      return (
        <div className="boxRecipe">
          {Data.map((receita) => (
            <CardReceita
              key={ receita.idMeal }
              id={ receita.idMeal }
              name={ receita.strMeal }
              thumneal={ receita.strMealThumb }
              pagina={ PageTitle }
            />
          ))}
        </div>);
    } if (Data !== null && Data.length === 1) {
      const paginadirect = `/${PageTitle.toLowerCase()}/${Data[0].idMeal}`;
      return <Redirect to={ paginadirect } />;
    } if (Data === null) {
      // eslint-disable-next-line no-alert
      alert('Sorry, we havent found any recipes for these filters');
    }
  }

  function resulOfSearchDrinks() {
    if (Data !== null && Data.length > 1) {
      return (
        <div className="boxRecipe">
          {Data.map((receita) => (
            <CardReceita
              key={ receita.idDrink }
              id={ receita.idDrink }
              name={ receita.strDrink }
              thumneal={ receita.strDrinkThumb }
              pagina={ PageTitle }
            />
          ))}
        </div>);
    } if (Data !== null && Data.length === 1) {
      const paginadirect = `/${PageTitle.toLowerCase()}/${Data[0].idDrink}`;
      return <Redirect to={ paginadirect } />;
    } if (Data === null) {
      <p>Sorry, we havent found any recipes for these filters.</p>;
    }
  }

  return (
    <header>
      <Link to="/profile" data-testid="profile-top-btn" src={ ProfileIcon }>
        <img
          src={ ProfileIcon }
          alt="profile"
        />
      </Link>
      <h3 data-testid="page-title" className="title1">{ PageTitle }</h3>
      <button
        className="searchButton"
        type="button"
        onClick={ () => (
          Search.search
            ? setSearch({ search: false })
            : setSearch({ search: true })
        ) }
      >
        <img
          src={ SearchIcon }
          alt="search"
          data-testid="search-top-btn"
        />
      </button>
      { Search.search
        ? (
          <div className="boxSearch">
            <form>
              <input className="searchInput" type="text" data-testid="search-input" />
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    data-testid="ingredient-search-radio"
                    value="i"
                  />
                  Ingredient
                </label>
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    data-testid="name-search-radio"
                    value="s"
                  />
                  Name
                </label>
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    data-testid="first-letter-search-radio"
                    value="f"
                  />
                  First letter
                </label>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-testid="exec-search-btn"
                  onClick={ handleButton }
                >
                  Search
                </button>
              </div>
            </form>
            <div>
              {
                (PageTitle === 'Foods' ? resulOfSearchFood() : resulOfSearchDrinks())
              }
            </div>
          </div>
        )
        : (
          <div />
        )}
    </header>
  );
}

Header.propTypes = {
  PageTitle: PropTypes.string,
}.isRequired;

export default Header;
