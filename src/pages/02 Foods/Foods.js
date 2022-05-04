import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import RecipesCard from '../../components/Recipes/RecipesCard';
import Footer from '../../components/Footer/Footer';
import { fetchFoods } from '../../services/fetchRecipesScreen';
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

  return (
    <div>
      <Header PageTitle="Foods" />
      <section>
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
