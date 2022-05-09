const verifyIsFavorite = (foodId, drinkId) => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (favoriteRecipes) {
    if (foodId.length > 0) {
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
