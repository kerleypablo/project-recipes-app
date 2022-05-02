const HeaderApiDrinks = async (RadioSelected, searchValue) => {
  let URLDrink = '';
  if (RadioSelected === 'i') {
    URLDrink = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${RadioSelected}=${searchValue}`;
  } else {
    URLDrink = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${RadioSelected}=${searchValue}`;
  }
  const response = await fetch(URLDrink);
  const result = await response.json();
  console.log(result);
  return result;
};

export default HeaderApiDrinks;
