import React, { useContext } from 'react';
import Context from '../../context/Context';
import './BtnCategories.css';

function ButtonDrinksCategory() {
  const {
    renderDrinkCategory,
    handleClickDCategories,
    toggleValue,
  } = useContext(Context);

  return (
    <section className="buttonCategory_Food">
      { renderDrinkCategory.map(({ strCategory }, index) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          className={ `buttonCategory ${toggleValue === strCategory
            ? 'buttonSelected' : ''}` }
          type="button"
          key={ index }
          onClick={ () => handleClickDCategories(strCategory) }
        >
          { strCategory }
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        type="button"
        className={ `buttonCategory ${toggleValue === ''
          ? 'buttonSelected' : ''}` }
        onClick={ () => handleClickDCategories('') }
      >
        All
      </button>
    </section>
  );
}

export default ButtonDrinksCategory;
