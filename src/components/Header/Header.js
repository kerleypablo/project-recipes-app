import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import './Header.css';
import HeaderApiFood from '../../redux/Services/HeaderApiFood';
import CardReceita from '../Receitas/CardReceita';
import Context from '../../context/Context';
import Style from './Header.module.css';

function Header({ PageTitle }) {
  const { Search, setSearch } = useContext(Context);
  // const [Search, setSearch] = useState({
  //   search: false,
  //   RadioSelected: '',
  //   searchValue: '',
  //   inputSerach: '',
  // });
  const [Data, setData] = useState([]);

  const handleButton = async () => {
    const NUM_RESULT = 12;
    if (Search.flexRadioDefault === 'f' && Search.inputSerach.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const valueRadio = document.querySelector('input:checked').value;
    const ValueTextInput = document.querySelector('.searchInput').value;
    const resultdata = await HeaderApiFood(valueRadio, ValueTextInput);
    if (resultdata.meals !== null) {
      const filter = await resultdata.meals.filter((ele, index) => index < NUM_RESULT);
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
    console.log(resultdata);
  };

  const ChangeOption = ({ target }) => {
    setSearch((prevState) => (
      {
        ...prevState,
        [target.name]: target.value,
      }
    ));
  };

  function resulOfSearchFood() {
    if (Data !== null && Data.length > 1) {
      return (
        <div className={ Style.boxRecipe }>
          {Data
            .map((receita, index) => (
              <CardReceita
                key={ receita.idMeal }
                id={ receita.idMeal }
                index={ index }
                name={ receita.strMeal }
                thumneal={ receita.strMealThumb }
                pagina={ PageTitle }
              />
            ))}
        </div>);
    } if (Data !== null && Data.length === 1) {
      const paginadirect = `/${PageTitle.toLowerCase()}/${Data[0].idMeal}`;
      return <Redirect to={ paginadirect } />;
    }
  }

  return (
    <header className={ Style.header }>
      <Link to="/profile" data-testid="profile-top-btn" src={ ProfileIcon }>
        <img
          src={ ProfileIcon }
          alt="profile"
        />
      </Link>
      <h3 data-testid="page-title" className={ Style.title1 }>{ PageTitle }</h3>
      <button
        className={ Style.searchButton }
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
          <div className={ Style.boxSearch }>
            <form className={ Style.formHeader }>
              <input
                className="searchInput"
                type="text"
                data-testid="search-input"
                onChange={ ChangeOption }
                name="inputSerach"
                value={ Search.inputSerach }
              />
              <div className={ Style.form_check }>
                <label className={ Style.form_check_label } htmlFor="flexRadioDefault1">
                  <input
                    className={ Style.form_check_input }
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    data-testid="ingredient-search-radio"
                    value="i"
                    onChange={ ChangeOption }
                  />
                  Ingredient
                </label>
                <label className={ Style.form_check_label } htmlFor="flexRadioDefault2">
                  <input
                    className={ Style.form_check_input }
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    data-testid="name-search-radio"
                    value="s"
                    onChange={ ChangeOption }
                  />
                  Name
                </label>
                <label className={ Style.form_check_label } htmlFor="flexRadioDefault3">
                  <input
                    className={ Style.form_check_input }
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
                  className={ Style.btn_primary }
                  data-testid="exec-search-btn"
                  onClick={ handleButton }
                >
                  Search
                </button>
              </div>
            </form>
            <div>
              {
                resulOfSearchFood()
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
