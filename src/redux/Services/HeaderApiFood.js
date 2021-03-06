const HeaderApiFood = async (RadioSelected, searchValue) => {
  let URLFood = '';
  if (RadioSelected === 'i') {
    URLFood = `https://www.themealdb.com/api/json/v1/1/filter.php?${RadioSelected}=${searchValue}`;
  } else {
    URLFood = `https://www.themealdb.com/api/json/v1/1/search.php?${RadioSelected}=${searchValue}`;
  }
  const response = await fetch(URLFood);
  const result = await response.json();
  return result;
};

export default HeaderApiFood;
