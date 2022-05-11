import React, { useEffect, useContext } from 'react';
import Context from '../../context/Context';
import Header from '../../components/Header/Header';
import RecipesCard from '../../components/RecipesScreen/RecipesCard';
import Footer from '../../components/Footer/Footer';
import ButtonFoodsCategory from '../../components/BtnCategories/BtnFoodsCategory';
import { fetchFoods } from '../../services/fetchRecipesScreen';
import './Foods.css';
import Style from './FooterSelected.module.css';

function Foods() {
  const {
    renderFoods,
    setRenderFoods,
    Search,
  } = useContext(Context);

  useEffect(() => {
    const getFoods = async () => {
      const foods = await fetchFoods();
      const foodsList = [...foods];
      setRenderFoods(foodsList);
    };
    getFoods();
  }, [setRenderFoods]);

  return (
    <div>
      <Header PageTitle="Foods" />
      <div className="boxButtons">
        <ButtonFoodsCategory />
      </div>
      <section className="foodsCategorySection">
        { Search.search
          ? (
            <>
            </>
          )
          : (
            <div className="container-recipes-card">
              {renderFoods.map(({ idMeal, strMealThumb, strMeal }, index) => (
                <RecipesCard
                  index={ index }
                  key={ idMeal }
                  id={ idMeal }
                  thumneal={ strMealThumb }
                  name={ strMeal }
                />
              ))}
            </div>
          )}
      </section>
      <Footer />
    </div>
  );
}

export default Foods;
