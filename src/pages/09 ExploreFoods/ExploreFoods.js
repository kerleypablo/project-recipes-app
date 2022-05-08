import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header2';

function ExploreFoods() {
  return (
    <div>
      <Header PageTitle="Explore Foods" />
      <section className="btnExplore">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-by-nationality"
          type="button"
        >
          By Nationality
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

export default ExploreFoods;
