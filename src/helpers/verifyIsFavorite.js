const verifyIsFavorite = (foodId, drinkId) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(foodId);
  if (favoriteRecipes) {
    if (foodId.length > 1) {
      return favoriteRecipes.some(
        (item) => item.id === foodId,
      );
    }
    return favoriteRecipes.some(
      (item) => item.id === drinkId,
    );
  }
};
export default verifyIsFavorite;
