const TWELVE = 12;
const FIVE = 5;

export const fetchFoods = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const dataFoods = data.meals.splice(0, TWELVE);
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
    const dataFoods = data.meals.splice(0, FIVE);
    return dataFoods;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDrinksCategory = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const dataDrinks = data.drinks.splice(0, FIVE);
    console.log(dataDrinks);
    return dataDrinks;
  } catch (error) {
    console.log(error);
  }
};
export const fetchByFoodsCategory = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    const dataFoods = data.categories.splice(0, TWELVE);
    console.log(dataFoods);
    return dataFoods;
  } catch (error) {
    console.log(error);
  }
};
