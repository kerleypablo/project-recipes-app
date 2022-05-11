import React, { useContext } from 'react';
import Context from '../../context/Context';
import './BtnCategories.css';
import Style from './BtnCategories.module.css';

function ButtonFoodsCategory() {
  const {
    renderBtnCategory,
    handleClickFCategories,
    toggleValue,
  } = useContext(Context);

  console.log(toggleValue);

  return (
    <section className={ Style.buttonCategory_Food }>
      { renderBtnCategory.map(({ strCategory }, index) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          className={ `buttonCategory ${toggleValue === strCategory
            ? 'buttonSelected' : ''}` }
          type="button"
          key={ index }
          name={ strCategory }
          value={ strCategory }
          onClick={ () => handleClickFCategories(strCategory) }
        >
          { strCategory }
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        type="button"
        className={ `buttonCategory ${toggleValue === ''
          ? 'buttonSelected' : ''}` }
        onClick={ () => handleClickFCategories('') }
      >
        All
      </button>
    </section>
  );
}

export default ButtonFoodsCategory;
