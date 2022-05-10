const verifyDoneRecipes = (food = {}, drink = {}) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes && food.idMeal !== undefined) {
    return doneRecipes.some((item) => item.id === food.idMeal);
  }
  if (doneRecipes && drink.idDrink !== undefined) {
    return doneRecipes.some((item) => item.id === drink.idDrink);
  }
};

export default verifyDoneRecipes;
