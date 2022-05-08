import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header2';
import { fetchRandomFoods } from '../../services/fetchExploreRandom';

function ExploreFoods() {
  const history = useHistory();
  const [idRandom, setIdRandom] = useState('');

  useEffect(() => {
    const getRandomFood = async () => {
      const randomFood = await fetchRandomFoods();
      const randomId = randomFood[0].idMeal;
      setIdRandom(randomId);
    };
    getRandomFood();
  }, []);
  console.log(idRandom);
  return (
    <div>
      <Header PageTitle="Explore Foods" />
      <section className="btnExplore">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/foods/ingredients') }
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-by-nationality"
          type="button"
          onClick={ () => history.push('/explore/foods/nationalities') }
        >
          By Nationality
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => history.push(`/foods/${idRandom}`) }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
