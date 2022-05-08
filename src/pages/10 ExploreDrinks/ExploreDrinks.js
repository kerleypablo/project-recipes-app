import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header2';

function ExploreDrinks() {
  const history = useHistory();
  return (
    <div>
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
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
