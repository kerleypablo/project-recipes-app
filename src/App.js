import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/01 Login/Login';
import Foods from './pages/02 Foods/Foods';
import Drinks from './pages/03 Drinks/Drinks';
import FoodsDetails from './pages/04 FoodsDetails/FoodsDetails';
import DrinksDetails from './pages/05 DrinksDetails/DrinksDetails';
import FoodsProgress from './pages/06 FoodsProgress/FoodsProgress';
import DrinksProgress from './pages/07 DrinksProgress/DrinksProgress';
import Explore from './pages/08 Explore/Explore';
import ExploreFoods from './pages/09 ExploreFoods/ExploreFoods';
import ExploreDrinks from './pages/10 ExploreDrinks/ExploreDrinks';
import ExploreFoodsIngredients from
'./pages/11 ExploreFoodsIngredients/ExploreFoodsIngredient';
import ExploreDrinksIngredients from
'./pages/12 ExploreDrinksIngredients/ExploreDrinksIngredients';
import ExploreFoodsNationality from
'./pages/13 ExploreFoodsNationality/ExploreFoodsNationality';
import Profile from './pages/14 Profile/Profile';
import RecipesMade from './pages/15 RecipesMade/RecipesMade';
import FavoritesRecipes from './pages/16 FavoritesRecipes/FavoritesRecipes';

function App() {
  return (
    <BrowserRouter>
      <div className="meals">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/foods/:id-da-receita" component={ FoodsDetails } />
          <Route exact path="/drinks/:id-da-receita" component={ DrinksDetails } />
          <Route
            exact
            path="/foods/{id-da-receita}/in-progress"
            component={ FoodsProgress }
          />
          <Route
            exact
            path="/drinks/{id-da-receita}/in-progress"
            component={ DrinksProgress }
          />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsIngredients }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksIngredients }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsNationality }
          />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ RecipesMade } />
          <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
