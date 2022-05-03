const fetchFoodDetails = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const result = await response.json();
  const { meals } = result;
  return meals;
};

export default fetchFoodDetails;
