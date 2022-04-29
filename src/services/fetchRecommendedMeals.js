const fetchRecommendedMeals = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(url);
  const result = await response.json();
  const { meals } = result;
  return meals;
};

export default fetchRecommendedMeals;
