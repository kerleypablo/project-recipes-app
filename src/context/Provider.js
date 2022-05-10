import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import { fetchFoods, fetchDrinks, fetchFoodsCategory, fetchByFoodsCategory,
  fetchDrinksCategory, fetchByDrinksCategory } from '../services/fetchRecipesScreen';

function Provider({ children }) {
  const [renderFoods, setRenderFoods] = useState([]);
  const [renderBtnCategory, setRenderBtnCategory] = useState([]);
  const [renderDrinks, setRenderDrinks] = useState([]);
  const [renderDrinkCategory, setRenderDrinkCategory] = useState([]);
  const [toggleValue, setToggleValue] = useState('');
  const [Search, setSearch] = useState({
    search: false,
    RadioSelected: '',
    searchValue: '',
    inputSerach: '',
  });

  useEffect(() => {
    const getCategory = async () => {
      const btnCategories = await fetchFoodsCategory();
      setRenderBtnCategory([...btnCategories]);
    };
    getCategory();
  }, []);

  const handleClickFCategories = async (category) => {
    let getData = [];
    if (category === toggleValue || category === '') {
      setToggleValue('');
      getData = await fetchFoods();
    } else {
      setToggleValue(category);
      getData = await fetchByFoodsCategory(category);
    }
    setRenderFoods([...getData]);
  };

  useEffect(() => {
    const getCategory = async () => {
      const categories = await fetchDrinksCategory();
      const listCategory = [...categories];
      setRenderDrinkCategory(listCategory);
    };
    getCategory();
  }, []);

  const handleClickDCategories = async (category) => {
    let getData = [];
    if (category === toggleValue || category === '') {
      setToggleValue('');
      getData = await fetchDrinks();
    } else {
      setToggleValue(category);
      getData = await fetchByDrinksCategory(category);
    }
    setRenderDrinks([...getData]);
  };

  const INITIAL_STATE = {
    renderFoods,
    setRenderFoods,
    renderBtnCategory,
    setRenderBtnCategory,
    handleClickFCategories,
    renderDrinks,
    setRenderDrinks,
    renderDrinkCategory,
    setRenderDrinkCategory,
    handleClickDCategories,
    toggleValue,
    setToggleValue,
    Search,
    setSearch,
  };

  return (
    <div>
      <Context.Provider value={ { ...INITIAL_STATE } }>
        { children }
      </Context.Provider>
    </div>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
