import React, { useContext } from 'react';
import Context from '../../context/Context';
import './BtnCategories.css';

function ButtonDrinksCategory() {
  const {
    renderDrinkCategory,
    handleClickDCategories,
  } = useContext(Context);

  return (
    <section className="buttonCategory">
      { renderDrinkCategory.map(({ strCategory }, index) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          className="buttonCategory"
          type="button"
          key={ index }
          onClick={ () => handleClickDCategories(strCategory) }
        >
          { strCategory }
        </button>
      ))}
    </section>
  );
}

export default ButtonDrinksCategory;
