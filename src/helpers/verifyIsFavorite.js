const verifyIsFavorite = (food, drink) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
