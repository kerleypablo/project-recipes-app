import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header2';
import Style from './Profile.module.css';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  return (
    <div>
      <Header PageTitle="Profile" />
      <section className={ Style.buttonCategory_Food }>
        <p data-testid="profile-email">{ email != null ? email.email : '' }</p>
        <div>

          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
