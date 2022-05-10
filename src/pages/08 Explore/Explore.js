import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header2';
import './Explore.css';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header PageTitle="Explorer" />
      <main className="container-buttons-explore">
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default Explore;
