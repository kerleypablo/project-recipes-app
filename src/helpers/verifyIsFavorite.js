const verifyIsFavorite = (food, drink) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(food);
  if (favoriteRecipes) {
    if (food.idMeal !== undefined) {
      return favoriteRecipes.some(
        (item) => item.id === food.idMeal,
      );
    }
    return favoriteRecipes.some(
      (item) => item.id === drink.idDrink,
    );
  }
};

export default verifyIsFavorite;
