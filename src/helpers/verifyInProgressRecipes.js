const verifyInProgressRecipes = (food = {}, drink = {}) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes) {
    if (
      inProgressRecipes.meals
      && food.idMeal !== undefined) {
      return Object.keys(inProgressRecipes.meals).some((item) => item === food.idMeal);
    }
    if (
      inProgressRecipes.cocktails
      && drink.idDrink !== undefined
      && Object.keys(inProgressRecipes.cocktails)
        .find((item) => item === drink.idDrink)) {
      return true;
    }
  }
  return false;
};

export default verifyInProgressRecipes;
