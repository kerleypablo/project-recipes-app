const TWELVE = 12;

export const fetchFoods = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const dataFoods = data.meals.splice(0, TWELVE);
    console.log(dataFoods);
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
    console.log(dataDrinks);
    return dataDrinks;
  } catch (error) {
    console.log(error);
  }
};
