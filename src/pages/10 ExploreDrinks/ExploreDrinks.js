import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header2';
import { fetchRandomDrinks } from '../../services/fetchExploreRandom';
import './ExploreDrinks.css';

function ExploreDrinks() {
  const history = useHistory();
  const [idRandom, setIdRandom] = useState('');

  useEffect(() => {
    const getRandomDrink = async () => {
      const randomDrink = await fetchRandomDrinks();
      const randomId = randomDrink[0].idDrink;
      setIdRandom(randomId);
    };
    getRandomDrink();
  }, []);

  return (
    <div className="box-explorer">
      <Header PageTitle="Explore Drinks" />
      <section>
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/drinks/${idRandom}`) }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
