const FIVE = 5;
const TWELVE = 12;

export const fetchFoods = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const dataFoods = data.meals.slice(0, TWELVE);
    return dataFoods;
  } catch (error) {
    return error;
  }
};

export const fetchFoodsCategory = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const dataFoods = data.meals.slice(0, FIVE);
    return dataFoods;
  } catch (error) {
    return error;
  }
};

export const fetchByFoodsCategory = async (category) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    const dataFoods = data.meals.slice(0, TWELVE);
    return dataFoods;
  } catch (error) {
    return error;
  }
};

export const fetchDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const dataDrinks = data.drinks.slice(0, TWELVE);
    return dataDrinks;
  } catch (error) {
    return error;
  }
};

export const fetchDrinksCategory = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const dataDrinks = data.drinks.slice(0, FIVE);
    return dataDrinks;
  } catch (error) {
    return error;
  }
};

export const fetchByDrinksCategory = async (category) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    const dataDrinks = data.drinks.slice(0, TWELVE);
    return dataDrinks;
  } catch (error) {
    return error;
  }
};
