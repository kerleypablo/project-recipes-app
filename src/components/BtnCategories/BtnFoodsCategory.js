import React, { useContext } from 'react';
import Context from '../../context/Context';
import './BtnCategories.css';

function ButtonFoodsCategory() {
  const {
    renderBtnCategory,
    handleClickFCategories,
  } = useContext(Context);

  return (
    <section className="buttonCategory">
      { renderBtnCategory.map(({ strCategory }, index) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          className="buttonCategory"
          type="button"
          key={ index }
          name={ strCategory }
          value={ strCategory }
          onClick={ () => handleClickFCategories(strCategory) }
        >
          { strCategory }
        </button>
      ))}
    </section>
  );
}

export default ButtonFoodsCategory;
