export const fetchRandomFoods = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const dataFoods = data.meals;
    console.log(dataFoods);
    return dataFoods;
  } catch (error) {
    return error;
  }
};

export const fetchRandomDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const dataDrinks = data.drinks;
    console.log(dataDrinks);
    return dataDrinks;
  } catch (error) {
    return error;
  }
};
