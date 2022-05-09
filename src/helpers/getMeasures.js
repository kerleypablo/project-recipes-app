const getMeasures = (meals, ingredients) => {
  const arrFilter = Object.keys(meals).filter((item) => item.includes('strMeasure'));
  let measures = [];
  Object.entries(meals).forEach((item) => {
    const findMeasure = arrFilter
      .find((e) => e === item[0] && item[1] !== '' && item[1] !== null);
    if (findMeasure) {
      measures = [...measures, item];
    }
  });
  ingredients.forEach((item, index) => {
    if (measures[index]) {
      ingredients[index] = [...item, '-', measures[index][1]];
    } else {
      ingredients[index] = [...item, '', ''];
    }
  });
  return ingredients;
};

export default getMeasures;
