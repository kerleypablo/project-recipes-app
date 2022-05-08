import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header2';

function ExploreDrinks() {
  return (
    <div>
      <Header PageTitle="Explore Drinks" />
      <section>
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
        >
          Surpresa Me!
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
