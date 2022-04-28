const fetchDrinkDetails = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const result = await response.json();
  const { drinks } = result;
  return drinks;
};

export default fetchDrinkDetails;
