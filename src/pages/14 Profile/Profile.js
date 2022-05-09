import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header2';

function Profile() {
  return (
    <div>
      <Header PageTitle="Profile" />
      <section>
        <p data-testid="profile-email">email</p>
        <button type="button" data-testid="profile-done-btn">
          Done Recipes
        </button>
        <button type="button" data-testid="profile-favorite-btn">
          Favorite Recipes
        </button>
        <button type="button" data-testid="profile-logout-btn">
          Logout
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
