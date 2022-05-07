const TWELVE = 12;
const FIVE = 5;

export const fetchFoods = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const dataFoods = data.meals.slice(0, TWELVE);
    return dataFoods;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const dataDrinks = data.drinks.splice(0, TWELVE);
    return dataDrinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchFoodsCategory = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const dataFoods = data.meals.slice(0, FIVE);
    console.log(dataFoods);
    return dataFoods;
  } catch (error) {
    console.log(error);
  }
};

export const fetchByFoodsCategory = async (category) => {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    const dataFoods = data.meals.slice(0, TWELVE);
    return dataFoods;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinksCategory = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const dataDrinks = data.drinks.slice(0, FIVE);
    return dataDrinks;
  } catch (error) {
    console.log(error);
  }
};

export const fetchByDrinksCategory = async (category) => {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    const dataDrinks = data.drinks.slice(0, TWELVE);
    console.log(dataDrinks);
    return dataDrinks;
  } catch (error) {
    console.log(error);
  }
};
