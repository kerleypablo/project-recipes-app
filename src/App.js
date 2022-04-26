import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="meals">
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
