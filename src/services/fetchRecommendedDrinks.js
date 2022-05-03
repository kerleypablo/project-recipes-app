const fetchRecommendedDrinks = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  const { drinks } = result;
  return drinks;
};

export default fetchRecommendedDrinks;
