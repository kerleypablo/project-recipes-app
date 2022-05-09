const getMeasures = (meals) => {
  const arrFilter = Object.keys(meals).filter((item) => item.includes('strMeasure'));
  let measures = [];
  Object.entries(meals).forEach((item) => {
    const findMeasure = arrFilter
      .find((e) => e === item[0] && item[1] !== '' && item[1] !== null);
    if (findMeasure) {
      measures = [...measures, item];
    }
  });
  return measures;
};

export default getMeasures;
