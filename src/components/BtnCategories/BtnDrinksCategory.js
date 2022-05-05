import React, { useEffect, useState } from 'react';
import { fetchDrinksCategory } from '../../services/fetchRecipesScreen';

function ButtonDrinksCategory() {
  const [renderFoodCategory, setRenderFoodCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const categories = await fetchDrinksCategory();
      const listCategory = [...categories];
      setRenderFoodCategory(listCategory);
    };
    getCategory();
  }, []);

  return (
    <section>
      { renderFoodCategory.map(({ strCategory }, index) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          className="buttonCategory"
          type="button"
          key={ index }
        >
          { strCategory }
        </button>
      ))}
    </section>
  );
}

export default ButtonDrinksCategory;
