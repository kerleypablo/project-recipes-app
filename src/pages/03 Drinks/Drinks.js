import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import HeaderDrinks from '../../components/Header/HeaderDrinks';
import RecipesCard from '../../components/Recipes/RecipesCard';
import { fetchDrinks } from '../../services/fetchRecipesScreen';
import './Drinks.css';

function Drinks() {
  const [renderDrinks, setRenderDrinks] = useState([]);
  useEffect(() => {
    const getDrinks = async () => {
      const drinks = await fetchDrinks();
      const drinksList = [...drinks];
      setRenderDrinks(drinksList);
    };
    getDrinks();
  }, []);

  return (
    <div>
      <HeaderDrinks PageTitle="Drinks" />
      <section>
        {renderDrinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          <RecipesCard
            index={ index }
            key={ idDrink }
            id={ idDrink }
            thumneal={ strDrinkThumb }
            name={ strDrink }
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default Drinks;
