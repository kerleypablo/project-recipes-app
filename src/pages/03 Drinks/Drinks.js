import React, { useEffect, useContext } from 'react';
import Context from '../../context/Context';
import Footer from '../../components/Footer/Footer';
import HeaderDrinks from '../../components/Header/HeaderDrinks';
import RecipesCard from '../../components/RecipesScreen/RecipesCard';
import BtnDrinksCategory from '../../components/BtnCategories/BtnDrinksCategory';
import { fetchDrinks } from '../../services/fetchRecipesScreen';
import './Drinks.css';

function Drinks() {
  const {
    renderDrinks,
    setRenderDrinks,
    Search,
  } = useContext(Context);

  useEffect(() => {
    const getDrinks = async () => {
      const drinks = await fetchDrinks();
      const drinksList = [...drinks];
      setRenderDrinks(drinksList);
    };
    getDrinks();
  }, [setRenderDrinks]);

  return (
    <div>
      <HeaderDrinks PageTitle="Drinks" />
      <div className="boxButtons">
        <BtnDrinksCategory />
      </div>
      <section className="foodsCategorySection">
        { Search.search
          ? (
            <>
            </>
          )
          : (
            <div className="container-recipes-card">
              {renderDrinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
                <RecipesCard
                  index={ index }
                  key={ idDrink }
                  id={ idDrink }
                  thumneal={ strDrinkThumb }
                  name={ strDrink }
                />
              ))}
            </div>
          )}
      </section>
      <Footer />
    </div>
  );
}

export default Drinks;
