import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import './Header.css';
import HeaderApiDrinks from '../../redux/Services/HeaderApiDrinks';
import CardReceita from '../Receitas/CardReceita';

function HeaderDrinks({ PageTitle }) {
  const [Search, setSearch] = useState({
    search: false,
    RadioSelected: '',
    searchValue: '',
    inputSerach: '',
  });
  const [Data, setData] = useState([]);

  const handleButton = async () => {
    const NUM_RESULT = 12;
    if (Search.flexRadioDefault === 'f' && Search.inputSerach.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const valueRadio = document.querySelector('input:checked').value;
    const ValueTextInput = document.querySelector('.searchInput').value;
    const resultdata = await HeaderApiDrinks(valueRadio, ValueTextInput);
    console.log(resultdata);
    if (resultdata.drinks !== null) {
      const filter = resultdata.drinks.filter((ele, index) => index < NUM_RESULT);
      setData(filter);
    } else {
      setData(null);
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setSearch((prevState) => (
      {
        ...prevState,
        RadioSelected: valueRadio,
        searchValue: ValueTextInput,
      }
    ));
  };

  function resulOfSearchDrinks() {
    if (Data !== null && Data.length > 1) {
      return (
        <div className="boxRecipe">
          {Data
            .map((receita, index) => (
              <CardReceita
                key={ receita.idDrink }
                id={ receita.idDrink }
                index={ index }
                name={ receita.strDrink }
                thumneal={ receita.strDrinkThumb }
                pagina={ PageTitle }
              />
            ))}
        </div>);
    } if (Data !== null && Data.length === 1) {
      const paginadirect = `/${PageTitle.toLowerCase()}/${Data[0].idDrink}`;
      return <Redirect to={ paginadirect } />;
    }
  }

  const ChangeOption = ({ target }) => {
    setSearch((prevState) => (
      {
        ...prevState,
        [target.name]: target.value,
      }
    ));
  };

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
            <form className="formHeader">
              <input
                className="searchInput"
                type="text"
                data-testid="search-input"
                onChange={ ChangeOption }
                name="inputSerach"
              />
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    data-testid="ingredient-search-radio"
                    value="i"
                    onChange={ ChangeOption }
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
                    onChange={ ChangeOption }
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
                    onChange={ ChangeOption }
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
                resulOfSearchDrinks()
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

HeaderDrinks.propTypes = {
  PageTitle: PropTypes.string,
}.isRequired;

export default HeaderDrinks;
