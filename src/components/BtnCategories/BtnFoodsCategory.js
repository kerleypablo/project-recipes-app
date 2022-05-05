import React, { useEffect, useState } from 'react';
import { fetchFoodsCategory } from '../../services/fetchRecipesScreen';

function ButtonFoodsCategory() {
  const [renderFoodsCategory, setRenderFoodsCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const categories = await fetchFoodsCategory();
      const listCategory = [...categories];
      setRenderFoodsCategory(listCategory);
    };
    getCategory();
  }, []);

  return (
    <section>
      { renderFoodsCategory.map(({ strCategory }, index) => (
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

export default ButtonFoodsCategory;
