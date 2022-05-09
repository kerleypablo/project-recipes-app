const verifyInProgressRecipes = (food = {}, drink = {}) => {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes) {
    if (food.idMeal !== undefined
      && Object.keys(inProgressRecipes.meals).find((item) => item === food.idMeal)) {
      return true;
    }
    if (drink.idDrink !== undefined
      && Object.keys(inProgressRecipes.cocktails)
        .find((item) => item === drink.idDrink)) {
      return true;
    }
    return false;
  }
};

export default verifyInProgressRecipes;
