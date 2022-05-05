import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import RecipesCard from '../../components/RecipesScreen/RecipesCard';
import Footer from '../../components/Footer/Footer';
import ButtonFoodsCategory from '../../components/BtnCategories/BtnFoodsCategory';
import { fetchFoods, fetchFoodsCategory } from '../../services/fetchRecipesScreen';
import './Foods.css';

function Foods() {
  const [renderFoods, setRenderFoods] = useState([]);
  useEffect(() => {
    const getFoods = async () => {
      const foods = await fetchFoods();
      const foodsList = [...foods];
      setRenderFoods(foodsList);
    };
    getFoods();
  }, []);

  const category = fetchFoodsCategory();
  console.log(category);

  return (
    <div>
      <Header PageTitle="Foods" />
      <section className="foodsCategorySection">
        <ButtonFoodsCategory />
        {renderFoods.map(({ idMeal, strMealThumb, strMeal }, index) => (
          <RecipesCard
            index={ index }
            key={ idMeal }
            id={ idMeal }
            thumneal={ strMealThumb }
            name={ strMeal }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default Foods;
